"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file.indexOf(".test.js") === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tokens = require("./token")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.companies = require("./company")(sequelize, Sequelize);
db.positions = require("./position")(sequelize, Sequelize);

db.companies.hasOne(db.users, { foreignKey: "company_id", targetKey: "id" });
db.users.belongsTo(db.companies, { foreignKey: "company_id" });
db.positions.hasOne(db.users, { foreignKey: "position_id", targetKey: "id" });
db.users.belongsTo(db.positions, { foreignKey: "position_id" });

module.exports = db;
