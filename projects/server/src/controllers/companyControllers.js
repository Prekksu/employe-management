const db = require("../models");

const companyController = {
	getAll: async (req, res) => {
		try {
			const company = await db.companies.findAll();
			return res.send(company);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	createCompany: async (req, res) => {
		try {
			const { company_name } = req.body;
			await db.companies.create({
				company_name,
			});
			return res.status(200).send({ message: "Company has been created" });
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	editCompany: async (req, res) => {
		const { id } = req.params;
		const { company_name } = req.body;

		try {
			await db.companies.update(
				{
					company_name,
				},
				{
					where: {
						id: id,
					},
				}
			);
			return res.status(200).json({ message: "Company has been updated" });
		} catch (err) {
			return res.status(500).send({
				message: err.message,
			});
		}
	},
	deleteCompany: async (req, res) => {
		const { id } = req.params;
		try {
			const company = await db.companies.findOne({ where: { id } });

			if (!company) {
				return res.status(404).send({ message: "Company not found." });
			}

			await db.companies.destroy({
				where: { id: id },
			});

			return res.status(200).send({ message: "Company deleted successfully." });
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
};
module.exports = companyController;
