📂 Portafolio API

API RESTful diseñada bajo principios de Clean Architecture y Domain-Driven Design (DDD) para gestionar la información de un portafolio profesional.

Implementada con Node.js + Express + Sequelize (MySQL), autenticación JWT, versionado de rutas, y documentada con OpenAPI/Swagger.
Incluye tests automatizados (Jest + Supertest) y está preparada para integrarse en un pipeline de CI/CD.

🏗️ Arquitectura

El proyecto sigue una arquitectura en capas con inspiración en Clean Architecture, garantizando separación de responsabilidades, mantenibilidad y escalabilidad.

src/
├── config/         # Configuración global (DB, Swagger, variables entorno)
├── models/         # Definición de entidades (Sequelize ORM)
├── controllers/    # Lógica de aplicación y casos de uso
├── routes/         # Endpoints REST agrupados por dominio
├── middlewares/    # Autenticación, validaciones, logging
├── tests/          # Pruebas unitarias e integración
└── app.js          # Punto de entrada principal


🔹 Capas principales:

Routes → Definen los endpoints REST versionados.

Controllers → Contienen la lógica de negocio, validan entradas y gestionan respuestas.

Models → Encapsulan la persistencia con Sequelize y representan entidades (User, Project, Skill, etc.).

Middlewares → Manejan autenticación JWT, validaciones y control de errores.

Infraestructura → Conexión MySQL, configuración global y documentación Swagger.

🔹 Buenas prácticas integradas:

Autenticación stateless con JWT.

Hashing seguro de contraseñas con bcrypt.

Swagger en /api/v1/docs.

Versionado de API → /api/v1/....

Pruebas automatizadas con Jest + Supertest.

🚀 Tecnologías

Node.js v18+

Express.js (framework HTTP)

Sequelize ORM (MySQL)

JWT (JSON Web Tokens)

Bcrypt.js

Swagger (OpenAPI 3.0)

Jest + Supertest

⚙️ Instalación y Configuración

Clonar repositorio

git clone https://github.com/tuusuario/portafolio-api.git
cd portafolio-api


Instalar dependencias

npm install


Configurar variables de entorno (.env)

DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=****
DB_NAME=portfolio_db
DB_DIALECT=mysql
JWT_SECRET=****
PORT=4000
NODE_ENV=development

▶️ Scripts

Desarrollo

npm run dev


Producción

npm start


Testing (con entorno limpio)

npm test

📌 Endpoints REST (Resumen)
🔑 Auth

POST /api/v1/auth/register → Registro

POST /api/v1/auth/login → Login + JWT

👤 About

PUT /api/v1/about (auth) → Crear/Actualizar información

GET /api/v1/about → Obtener información

🎓 Educación

GET /api/v1/education

POST /api/v1/education (auth)

PUT /api/v1/education/:id (auth)

DELETE /api/v1/education/:id (auth)

💼 Experiencia

GET /api/v1/experience

POST /api/v1/experience (auth)

PUT /api/v1/experience/:id (auth)

DELETE /api/v1/experience/:id (auth)

🛠️ Skills

CRUD completo

📜 Projects

CRUD completo

📖 Documentación Swagger

Una vez en ejecución, accede a la documentación interactiva en:

http://localhost:4000/api/v1/docs


Generado con swagger-ui-express y sincronizado con los endpoints de la API.

🧪 Testing

Se utilizan Jest + Supertest para pruebas unitarias y de integración.
Cada test inicializa la BD en modo test y valida los flujos principales.

Ejemplo (Auth API):

it("debería registrar un usuario", async () => {
  const res = await request(app).post("/api/v1/auth/register").send({
    username: "testuser",
    password: "123456",
  });
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("username", "testuser");
});


Ejecución:

npm test

🛡️ Buenas Prácticas Implementadas

✔ Principio de responsabilidad única en controladores y servicios.
✔ Autenticación stateless con JWT.
✔ Hashing seguro de contraseñas con bcrypt.
✔ Validaciones centralizadas con middlewares.
✔ Migraciones automáticas con sequelize.sync() en entorno test.
✔ Tests end-to-end para Auth, About, CRUDs.
✔ Versionado de API para evolución controlada.