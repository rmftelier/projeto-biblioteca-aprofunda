import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { createTestAdminAndGetToken, clearDatabase } from "@tests/utils/setupTestUser";

describe('PATCH /books/:id', () => {
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


  it('deve alterar o título do livro', async () => {

    const { body } = await request(app)
      .post("/books")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Jurassic Park",
        author: "Michael Crichton",
        publishedAt: "2015-06-12",
        format: "Físico",
        pages: 528,
        genres: ["Ficção Científica", "Ação", "Aventura"],
        language: "Português"
      });

    const response = await request(app)
      .patch(`/books/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Orgulho e Preconceito"
      });

    expect(response.status).toBe(200);
    expect(response.body.book.title).toBe("Orgulho e Preconceito");
  });

  it("deve retornar 404 quando o id for inválido", async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app)
      .patch(`/books/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Dom Casmurro"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Livro não encontrado");

  });
});