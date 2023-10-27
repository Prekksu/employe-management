const db = require("../models");
const bcrypt = require("bcrypt");

const userController = {
	getAll: async (req, res) => {
		try {
			const user = await db.users.findAll();
			return res.send(user);
		} catch (err) {
			res.status(500).send({
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

			res.status(201).json({ msg: "User has been created" });
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	editUser: async (req, res) => {
		try {
			const { fullname, phone_number } = req.body;
			await db.users.update(
				{
					fullname,
					phone_number,
				},
				{
					where: {
						uuid: req.params.id,
					},
				}
			);
			res.status(200).json({ msg: "User has been updated" });
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	deleteUser: async (req, res) => {
		try {
			await db.users.destroy({
				where: {
					uuid: req.params.uuid,
				},
			});
			res.status(200).json({ msg: "User has been deleted" });
		} catch (error) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
};
