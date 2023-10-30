const db = require("../models");
const { Op } = require("sequelize");

const companyController = {
	getAll: async (req, res) => {
		try {
			const company = await db.companies.findAll();
			const sortedCompanies = company.sort((a, b) => {
				return a.company_name.localeCompare(b.company_name);
			});
			return res.send(sortedCompanies);
		} catch (err) {
			res.status(500).send({
				message: err.message,
			});
		}
	},
	getCompanyById: async (req, res) => {
		const { id } = req.params;
		try {
			const company = await db.companies.findOne({ where: { id } });
			if (!company) {
				return res.status(404).send({ message: "Company not found" });
			}
			return res.status(200).send(company);
		} catch (error) {
			return res.status(500).send({ message: error.message });
		}
	},
	createCompany: async (req, res) => {
		const { company_name } = req.body;
		try {
			const existingCompany = await db.companies.findOne({
				where: { company_name },
			});

			if (existingCompany) {
				throw new Error("Company with the same name already exists");
			}

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
			const existingCompany = await db.companies.findOne({
				where: {
					company_name,
					id: { [Op.not]: id },
				},
			});

			if (existingCompany) {
				return res.status(400).send({ message: "Company already exists." });
			}

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
