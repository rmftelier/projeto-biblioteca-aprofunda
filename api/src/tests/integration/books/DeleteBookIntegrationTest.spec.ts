import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { createTestAdminAndGetToken, clearDatabase } from "@tests/utils/setupTestUser";

describe("DELETE /books/:id", () => {
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

  it("deve retornar 204 quando remover um livro com sucesso", async () => {

    const { body } = await request(app)
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

    const response = await request(app)
      .delete(`/books/${body.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204);
  });

  it("deve retornar 404 quando tentar remover um livro inexistente", async () => {
    const fakeId = new Types.ObjectId(); // gera um ObjectId válido aleatório
    const response = await request(app)
      .delete(`/books/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Livro não encontrado');
  });

});