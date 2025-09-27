const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/db");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Crear admin y generar token
  const hashed = await bcrypt.hash("123456", 10);
  const user = await User.create({ username: "admin", password: hashed });
  token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
});

describe("Skills API", () => {
  it("debería crear un skill con auth", async () => {
    const res = await request(app)
      .post("/api/v1/skills")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "JavaScript",
        level: "Avanzado",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "JavaScript");
  });

  it("debería listar skills", async () => {
    const res = await request(app).get("/api/v1/skills");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  await sequelize.close();
});
