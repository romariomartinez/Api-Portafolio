const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // 👈 IMPORTANTE

const Education = sequelize.define("Education", {
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  field: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Education;
