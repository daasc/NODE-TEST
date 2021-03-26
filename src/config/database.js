const config = require("./config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    logging: false,
    dialect: config.dialect,
    port: config.port,
    storage: config.storage,
  },
  config.define
);

module.exports = sequelize;
