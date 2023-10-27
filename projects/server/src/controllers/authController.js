const db = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const secretKey = process.env.secret_key;
const moment = require("moment");

const userController = {
	register: async (req, res) => {
		try {
			const { fullname, email, phone_number, password } = req.body;

			const existingUser = await db.users.findOne({
				where: {
					[Op.or]: [{ email }, { phone_number }],
				},
			});

			if (existingUser) {
				return res.status(400).send({
					message: "User with this email or phone number already exists.",
				});
			}

			const hashPassword = await bcrypt.hash(password, 10);

			await db.users.create({
				fullname,
				email,
				phone_number,
				password: hashPassword,
				role: "EMPLOYE",
			});

			return res.send({
				message: "Your registration was successful.",
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	login: async (req, res) => {
		try {
			const { email, phone_number, password } = req.body;
			let user;

			// Check if the user exists with email
			if (email) {
				user = await db.users.findOne({
					where: {
						email: email,
					},
				});
			}
			// If user doesn't exist with email, check with phone number
			else if (phone_number) {
				user = await db.users.findOne({
					where: {
						phone_number: phone_number,
					},
				});
			}

			if (!user) {
				return res.status(404).send({
					message: "User not found.",
				});
			}

			const match = await bcrypt.compare(password, user.password);

			if (!match) {
				return res.status(401).send({
					message: "Incorrect password.",
				});
			}

			const userId = { id: user.dataValues.id };
			let token = await db.tokens.findOne({
				where: {
					userId: JSON.stringify(userId),
					expired: {
						[Op.gte]: moment().format(),
					},
					valid: true,
					status: "LOGIN",
				},
			});

			const generateToken = jwt.sign({ userId: user.id }, secretKey, {
				expiresIn: "1d",
			});

			if (!token) {
				token = await db.tokens.create({
					expired: moment().add(1, "d").format(),
					token: generateToken,
					userId: JSON.stringify(userId),
					status: "LOGIN",
				});
			} else {
				await db.tokens.update(
					{
						expired: moment().add(1, "days").format(),
						token: generateToken,
					},
					{
						where: {
							userId: JSON.stringify(userId),
							status: "LOGIN",
						},
					}
				);
			}

			return res.status(200).send({
				message: "Success login",
				token: generateToken,
				data: user.dataValues,
			});
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
};

module.exports = userController;
