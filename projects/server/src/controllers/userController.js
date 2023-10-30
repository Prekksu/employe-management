const { Op } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");

const userController = {
	getAll: async (req, res) => {
		try {
			const { sort, search, position_id, company_id } = req.query;
			const limit = 5;

			const page = req?.query?.page || 1;
			let offset = (parseInt(page) - 1) * limit;

			const sortOptions = {
				fullnameAsc: [["fullname", "ASC"]],
				fullnameDesc: [["fullname", "DESC"]],
				emailAsc: [["email", "ASC"]],
				emailDesc: [["email", "DESC"]],
				phone_numberAsc: [["phone_number", "ASC"]],
				phone_numberDesc: [["phone_number", "DESC"]],
				roleAsc: [["role", "ASC"]],
				roleDesc: [["role", "DESC"]],
				positionAsc: [[{ model: db.positions }, "position", "ASC"]],
				positionDesc: [[{ model: db.positions }, "position", "DESC"]],
				companyAsc: [[{ model: db.companies }, "company_name", "ASC"]],
				companyDesc: [[{ model: db.companies }, "company_name", "DESC"]],
			};
			const sortOrder = sortOptions[sort] || sortOptions.fullnameAsc;

			const whereClause = {};

			if (search) {
				whereClause.fullname = { [db.Sequelize.Op.like]: `%${search || ""}%` };
			}

			if (position_id) {
				whereClause.position_id = position_id;
			}

			if (company_id) {
				whereClause.company_id = company_id;
			}

			const users = await db.users.findAndCountAll({
				attributes: [
					"id",
					"fullname",
					"email",
					"phone_number",
					"avatar_url",
					"position_id",
					"company_id",
					"role",
				],
				include: [
					{
						model: db.positions,
					},
					{
						model: db.companies,
					},
				],
				where: whereClause,
				distinct: true,
				order: sortOrder,
			});
			return res.status(200).send({
				count: users.count,
				rows: users.rows.slice(offset, limit * page),
			});
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
					"password",
				],
				include: [
					{
						model: db.positions,
						attributes: ["id", "position"],
					},
					{
						model: db.companies,
						attributes: ["id", "company_name"],
					},
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
			const { filename } = req.file;

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
				avatar_url: "userImg/" + filename,
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
			const { fullname, email, phone_number } = req.body;

			const existingUser = await db.users.findOne({
				where: {
					[Op.and]: [
						{ [Op.or]: [{ email }, { phone_number }] },
						{ id: { [Op.not]: id } },
					],
				},
			});

			if (existingUser) {
				return res.status(400).send({
					message: "User with this email or phone number already exists.",
				});
			}

			await db.users.update(
				{
					fullname,
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
	adminEditUser: async (req, res) => {
		const { id } = req.params;
		const {
			fullname,
			email,
			phone_number,
			company_id,
			position_id,
			role,
			avatar_url,
		} = req.body;

		try {
			const existingUser = await db.users.findOne({
				where: {
					[Op.and]: [
						{ [Op.or]: [{ email }, { phone_number }] },
						{ id: { [Op.not]: id } },
					],
				},
			});

			if (existingUser) {
				return res.status(400).send({
					message: "User with this email or phone number already exists.",
				});
			}

			await db.users.update(
				{
					fullname,
					email,
					phone_number,
					company_id,
					position_id,
					role,
					avatar_url,
				},
				{
					where: {
						id: id,
					},
				}
			);
			return res.status(200).json({ message: "User has been updated" });
		} catch (error) {
			return res.status(500).send({
				message: error.message,
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
};

module.exports = userController;
