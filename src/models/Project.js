const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Project = sequelize.define("Project", {
  title_es: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title_en: {
    type: DataTypes.STRING,
  },
  
  description_es: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description_en: {
    type: DataTypes.TEXT,
  },
  
  image: {
    type: DataTypes.STRING, // URL a la imagen en Supabase
  },
  link: {
    type: DataTypes.STRING, // GitHub, Deploy, etc.
  },
  stack: {
    type: DataTypes.STRING, // Tecnologías usadas
  },
});

module.exports = Project;





module.exports = Project;
