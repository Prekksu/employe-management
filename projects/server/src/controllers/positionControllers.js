const db = require("../models");

const positionController = {
	getAll: async (req, res) => {
		try {
			const position = await db.positions.findAll();
			return res.send(position);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	createPosition: async (req, res) => {
		try {
			const { position } = req.body;
			await db.positions.create({
				position,
			});
			return res.status(200).send({ message: "Position has been created" });
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	editPosition: async (req, res) => {
		const { id } = req.params;
		const { position } = req.body;

		try {
			await db.positions.update(
				{
					position,
				},
				{
					where: {
						id: id,
					},
				}
			);
			return res.status(200).json({ message: "Position has been updated" });
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	deletePosition: async (req, res) => {
		const { id } = req.params;
		try {
			const position = await db.positions.findOne({ where: { id } });

			if (!position) {
				return res.status(404).send({ message: "Position not found." });
			}

			await db.positions.destroy({
				where: { id: id },
			});

			return res
				.status(200)
				.send({ message: "Position deleted successfully." });
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
};
module.exports = positionController;
