const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API para gestionar portafolio con proyectos, skills, experiencia, educación, etc.",
    },
    servers: [{ url: "http://localhost:4000/api" }],
  },
  apis: ["./src/routes/*.js"], // se generan docs desde los comentarios en las rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
