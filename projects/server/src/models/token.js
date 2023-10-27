module.exports = (sequelize, Sequelize) => {
	const tokens = sequelize.define(
		"tokens",
		{
			token: {
				type: Sequelize.STRING,
			},
			expired: {
				type: Sequelize.DATE,
			},
			valid: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			status: {
				type: Sequelize.ENUM("LOGIN", "FORGOT-PASSWORD"),
			},
			userId: {
				type: Sequelize.STRING,
			},
		},
		{
			paranoid: true,
		}
	);
	return tokens;
};
