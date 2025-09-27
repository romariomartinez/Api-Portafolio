const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Certification = sequelize.define("Certification", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  url: {
    type: DataTypes.STRING, // enlace al certificado digital
  },
});

module.exports = Certification;
