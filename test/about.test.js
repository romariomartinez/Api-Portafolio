const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/config/db");

let token;

beforeAll(async () => {
  // limpiar BD antes de pruebas
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

describe("About API (único)", () => {
  it("debería crear About la primera vez con PUT", async () => {
    const res = await request(app)
      .put("/api/v1/about") 
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Romario",
        bio: "Desarrollador Web Full Stack",
        email: "romario@mail.com",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("about");
    expect(res.body.about).toHaveProperty("name", "Romario");
  });

  it("debería obtener About con GET", async () => {
    const res = await request(app).get("/api/v1/about");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Romario");
  });

  it("debería actualizar About si ya existe con PUT", async () => {
    const res = await request(app)
      .put("/api/v1/about") // vuelve a usar PUT
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Romario Actualizado",
        bio: "Desarrollador Backend",
        email: "romario@update.com",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.about).toHaveProperty("name", "Romario Actualizado");
  });
});

afterAll(async () => {
  await sequelize.close();
});
