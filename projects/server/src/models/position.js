module.exports = (sequelize, Sequelize) => {
	const positions = sequelize.define("positions", {
		position: Sequelize.STRING,
	});
	return positions;
};
