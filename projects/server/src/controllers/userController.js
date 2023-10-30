const { Op } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");

const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.users.findAll();
			return res.send(user);
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	getUsersById: async (req, res) => {
		try {
			const response = await db.users.findOne({
				attributes: [
					"id",
					"fullname",
					"email",
					"phone_number",
					"avatar_url",
					"position_id",
					"company_id",
				],
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	createUser: async (req, res) => {
		try {
			const {
				fullname,
				email,
				phone_number,
				password,
				role,
				company_id,
				position_id,
			} = req.body;

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
				role,
				company_id,
				position_id,
			});

			return res.status(201).json({ message: "User has been created" });
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	editUser: async (req, res) => {
		try {
			const { fullname, password, email, phone_number } = req.body;

			await db.users.update(
				{
					fullname,
					password,
					email,
					phone_number,
				},
				{
					where: {
						id: req.params.id,
					},
				}
			);
			return res.status(200).json({ message: "User has been updated" });
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	deleteUser: async (req, res) => {
		try {
			await db.users.destroy({
				where: {
					id: req.params.id,
				},
			});
			return res.status(200).json({ message: "User has been deleted" });
		} catch (error) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	insertImage: async (req, res) => {
		try {
			const { filename } = req.file;
			await db.users.update(
				{ avatar_url: "userImg/" + filename },
				{ where: { id: req.params.id } }
			);
			return res.send({ message: "Avatar Updated" });
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
	assignPosition: async (req, res) => {
		const { position_id, id } = req.body;
		try {
			await db.users.update({ position_id }, { where: { id } });
			return res.send({ message: "Position assignment successful." });
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
	assignCompany: async (req, res) => {
		const { company_id, id } = req.body;
		try {
			await db.users.update({ company_id }, { where: { id } });
			return res.send({ message: "Company assignment successful." });
		} catch (error) {
			return res.status(500).send({
				message: error.message,
			});
		}
	},
};

module.exports = userController;
