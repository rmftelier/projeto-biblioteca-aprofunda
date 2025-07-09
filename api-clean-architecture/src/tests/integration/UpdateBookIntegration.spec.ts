import request from "supertest";

import app from "../../infra/server/server";

describe('PATCH /books/:id', () => {
  let bookId: string;

  beforeAll(async () => {
    const { body } = await request(app).post("/books").send({
      title: "Jurassic Park",
      author: "Michael Crichton",
      publishedAt: "2015-06-12",
      format: "Físico",
      pages: 528,
      genres: ["Ficção Científica", "Ação", "Aventura"],
      language: "Português",
      createdAt: "2025-07-07"
    });
    bookId = body.id;
  });

  it('deve alterar um título de livro', async () => {
    const response = await request(app).patch(`/books/${bookId}`).send({
      title: "Orgulho e Preconceito"
    });

    expect(response.status).toBe(201);
  });

  it("deve retornar 404 quando um id for inválido", async () => {
    const response = await request(app).patch("/books/123456").send({
      title: "Dom Casmurro"
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Livro não encontrado");

  });
});