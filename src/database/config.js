const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: process.env.DB,
  host: process.env.HOST,
  username: process.env.DB,
  password: process.env.PASS,
  database: process.env.NAMEDB,
  logging: false,
});

module.exports = { db };
