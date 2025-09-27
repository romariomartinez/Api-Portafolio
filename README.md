# 📂 Portafolio API

API RESTful diseñada bajo principios de **Clean Architecture** y **Domain-Driven Design (DDD)** para gestionar la información de un portafolio profesional.  

Implementada con **Node.js + Express + Sequelize (MySQL)**, autenticación con **JWT**, versionado de rutas y documentada con **OpenAPI/Swagger**.  
Incluye **tests automatizados (Jest + Supertest)** y está lista para integrarse en un pipeline de **CI/CD**.

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura en capas, garantizando separación de responsabilidades, mantenibilidad y escalabilidad.

src/
├── config/ # Configuración global (DB, Swagger, variables entorno)
├── models/ # Entidades y persistencia (Sequelize ORM)
├── controllers/ # Lógica de negocio y casos de uso
├── routes/ # Endpoints REST agrupados por dominio
├── middlewares/ # Autenticación, validaciones, logging
├── tests/ # Pruebas unitarias e integración
└── app.js # Punto de entrada principal

yaml
Copiar código

### 🔹 Capas principales
- **Routes** → Definen endpoints REST versionados.  
- **Controllers** → Contienen la lógica de negocio y validan entradas.  
- **Models** → Representan entidades y encapsulan persistencia.  
- **Middlewares** → JWT, validaciones y manejo de errores.  
- **Infraestructura** → Conexión MySQL, configuración global, Swagger.  

---

## 🚀 Tecnologías

- Node.js v18+  
- Express.js  
- Sequelize (MySQL)  
- JWT (JSON Web Tokens)  
- Bcrypt.js  
- Swagger (OpenAPI 3.0)  
- Jest + Supertest  

---

## ⚙️ Instalación y Configuración

### 1. Clonar repositorio
```bash
git clone https://github.com/tuusuario/portafolio-api.git
cd portafolio-api
2. Instalar dependencias
bash
Copiar código
npm install
3. Configurar variables de entorno (.env)
env
Copiar código
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=****
DB_NAME=portfolio_db
DB_DIALECT=mysql
JWT_SECRET=****
PORT=4000
NODE_ENV=development
4. Crear base de datos
sql
Copiar código
CREATE DATABASE portfolio_db;
▶️ Scripts
npm run dev → Modo desarrollo

npm start → Producción

npm test → Testing con entorno limpio

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

📖 Swagger Docs: http://localhost:4000/api/v1/docs

🧪 Testing
Framework: Jest + Supertest
Cada test inicializa la BD en modo test y valida los flujos principales (Auth, About, CRUDs).

Ejemplo:

js
Copiar código
it("debería registrar un usuario", async () => {
  const res = await request(app).post("/api/v1/auth/register").send({
    username: "testuser",
    password: "123456",
  });
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("username", "testuser");
});
Ejecución:

bash
Copiar código
npm test
🛡️ Buenas Prácticas
✔ Principio de responsabilidad única en controladores y servicios
✔ Autenticación stateless con JWT
✔ Hashing seguro de contraseñas con bcrypt
✔ Validaciones centralizadas en middlewares
✔ Migraciones automáticas con sequelize.sync() en entorno test
✔ Tests end-to-end para Auth, About y CRUDs
✔ Versionado de API para evolución controlada
