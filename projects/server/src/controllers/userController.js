const db = require("../models");
const bcrypt = require("bcrypt");

const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.users.findAll({
				attributes: ["uuid", "fullname", "email", "phone_number", "role"],
			});
			return res.send(user);
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	createUser: async (req, res) => {
		try {
			const { fullname, email, phone_number, password, role } = value;
			const hashPassword = await bcrypt.hash(password, 10);

			await db.users.create({
				fullname,
				email,
				phone_number,
				password: hashPassword,
				role,
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
			const { fullname, password } = req.body;

			await db.users.update(
				{
					fullname,
					password,
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
};

module.exports = userController;
