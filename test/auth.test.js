const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/db");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // limpia BD antes de pruebas
});

describe("Auth API", () => {
  it("debería registrar un usuario", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      username: "testuser",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("username", "testuser");
  });

  it("debería loguear al usuario y devolver token", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      username: "testuser",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

afterAll(async () => {
  await sequelize.close();
});
