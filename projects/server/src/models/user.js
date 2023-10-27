module.exports = (sequelize, Sequelize) => {
	const users = sequelize.define(
		"users",
		{
			fullname: Sequelize.STRING,
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			phone_number: {
				type: Sequelize.STRING,
				validate: {
					isNumeric: true,
					len: [0, 12],
				},
			},
			password: Sequelize.STRING,
			role: Sequelize.ENUM("S_ADMIN", "HR_ADMIN", "EMPLOYE"),
			avatar_url: Sequelize.STRING,
		},
		{
			paranoid: true,
		}
	);
	return users;
};
