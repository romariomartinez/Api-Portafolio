const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/db");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Crear usuario manualmente
  const hashed = await bcrypt.hash("123456", 10);
  const user = await User.create({ username: "admin", password: hashed });

  token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
});

describe("Projects API", () => {
  it("debería crear un proyecto con auth", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title_es: "Proyecto Test",
        description_es: "Descripción test",
        stack: "Node.js",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title_es", "Proyecto Test");
  });

  it("debería listar proyectos", async () => {
    const res = await request(app).get("/api/v1/projects");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data || res.body)).toBe(true);
  });
});

afterAll(async () => {
  await sequelize.close();
});
