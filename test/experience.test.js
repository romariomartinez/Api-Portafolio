const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/db");

let token;

beforeAll(async () => {
  // limpiar BD
  await sequelize.sync({ force: true });

  // crear usuario de prueba
  await request(app).post("/api/v1/auth/register").send({
    username: "testuser",
    password: "testpass",
  });

  // login y obtener token
  const res = await request(app).post("/api/v1/auth/login").send({
    username: "testuser",
    password: "testpass",
  });

  token = res.body.token;
});

describe("Experience API", () => {
  let expId;

  it("debería crear una experiencia con auth", async () => {
    const res = await request(app)
      .post("/api/v1/experience")
      .set("Authorization", `Bearer ${token}`)
      .send({
        company: "Tech Corp",
        role: "Desarrollador Backend",
        description: "Trabajo en APIs REST con Node.js",
        startDate: "2022-01-01",
        endDate: "2023-01-01",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expId = res.body.id;
  });

  it("debería listar experiencias", async () => {
    const res = await request(app).get("/api/v1/experience");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debería actualizar una experiencia con auth", async () => {
    const res = await request(app)
      .put(`/api/v1/experience/${expId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ role: "Desarrollador Fullstack" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Experiencia actualizada");
  });

  it("debería eliminar una experiencia con auth", async () => {
    const res = await request(app)
      .delete(`/api/v1/experience/${expId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Experiencia eliminada");
  });
});

afterAll(async () => {
  await sequelize.close();
});
