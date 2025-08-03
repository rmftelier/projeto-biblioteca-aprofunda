import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { createTestAdminAndGetToken, clearDatabase } from "@tests/utils/setupTestUser";

describe('GET /books', () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await clearDatabase();
    token = await createTestAdminAndGetToken();
  });

  it('deve retornar todos os livros cadastrados com sucesso', async () => {

    await request(app)
      .post("/books")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Jurassic Park",
        author: "Michael Crichton",
        publishedYear: 2015,
        format: "Físico",
        pages: 528,
        genres: ["Ficção Científica", "Ação", "Aventura"],
        language: "Português"
      });

    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe("Jurassic Park");
  });


});