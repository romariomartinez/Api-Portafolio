const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Skill = sequelize.define("Skill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING, // ejemplo: Básico, Intermedio, Avanzado
  },
  icon: {
    type: DataTypes.STRING, // URL a un ícono si quieres mostrarlo
  },
});

module.exports = Skill;
