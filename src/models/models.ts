const sequelize = require("../database.ts");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING },
  surName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  photo: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(1234), allowNull: false },
  published: { type: DataTypes.STRING, defaultValue: "Нет" },
});

User.hasMany(Product);
Product.belongsTo(User);

module.exports = {
  User,
  Product,
};
