module.exports = (sequelize, Sequelize) => {
	const companies = sequelize.define("companies", {
		company_name: Sequelize.STRING,
	});
	return companies;
};
