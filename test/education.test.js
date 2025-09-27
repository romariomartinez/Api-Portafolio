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

describe("Education API", () => {
  let eduId;

  it("debería crear una educación con auth", async () => {
    const res = await request(app)
      .post("/api/v1/education")
      .set("Authorization", `Bearer ${token}`)
      .send({
        institution: "Universidad Popular del Cesar",
        degree: "Ingeniería de Sistemas",
        startDate: "2021-01-01",
        endDate: "2025-01-01",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    eduId = res.body.id;
  });

  it("debería listar educaciones", async () => {
    const res = await request(app).get("/api/v1/education");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("debería actualizar una educación con auth", async () => {
    const res = await request(app)
      .put(`/api/v1/education/${eduId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ degree: "Ingeniería de Software" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Formación actualizada");
  });

  it("debería eliminar una educación con auth", async () => {
    const res = await request(app)
      .delete(`/api/v1/education/${eduId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Formación eliminada");
  });
});

afterAll(async () => {
  await sequelize.close();
});
