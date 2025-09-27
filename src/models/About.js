const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const About = sequelize.define("About", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT, // tu descripción personal
  },
  photo: {
    type: DataTypes.STRING, // URL a tu foto
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  linkedin: {
    type: DataTypes.STRING,
  },
  github: {
    type: DataTypes.STRING,
  }
});

module.exports = About;
