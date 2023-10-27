module.exports = (sequelize, Sequelize) => {
	const company = sequelize.define("companies", {
		name: Sequelize.STRING,
	});
	return company;
};
