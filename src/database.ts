const Sequelize = require("sequelize");

module.exports = new Sequelize("backend_api", "postgres", "01BAH*oI", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});
