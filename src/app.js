// app.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const skillRoutes = require("./routes/skill.routes");
const certificationRoutes = require("./routes/certification.routes");
const educationRoutes = require("./routes/education.routes");
const experienceRoutes = require("./routes/experience.routes");
const aboutRoutes = require("./routes/about.routes");

const isTest = process.env.NODE_ENV === "test";

// Forzar carga de modelos
require("./models/User");
require("./models/Project");
require("./models/Skill");
require("./models/Certification");
require("./models/Experience");
require("./models/Education");
require("./models/About");

const app = express();
app.use(cors());
app.use(express.json());

// Versionado de la API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/certifications", certificationRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/experience", experienceRoutes);
app.use("/api/v1/about", aboutRoutes);

// Documentación Swagger
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conexión y sincronización
sequelize.authenticate()
  .then(() => console.log("Conexión a MySQL establecida"))
  .catch((err) => console.error("Error en la conexión:", err));

// ⚠️ Evitar sync en modo test (Jest ya lo maneja en beforeAll)
if (!isTest) {
  sequelize
    .sync({ force: true }) // o { alter: true } en desarrollo
    .then(() => console.log(" Tablas sincronizadas"))
    .catch((err) => console.error("Error al sincronizar tablas:", err));
}

module.exports = app;
