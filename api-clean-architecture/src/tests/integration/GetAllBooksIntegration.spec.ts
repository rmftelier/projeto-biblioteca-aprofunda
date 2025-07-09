import request from "supertest";

import app from "../../infra/server/server";

describe('GET /books', () => {

  it('deve retornar todos os livros cadastrados com sucesso', async () => {

    await request(app).post("/books").send({
      title: "Jurassic Park",
      author: "Michael Crichton",
      publishedAt: "2015-06-12",
      format: "Físico",
      pages: 528,
      genres: ["Ficção Científica", "Ação", "Aventura"],
      language: "Português",
      createdAt: "2025-07-07"
    });

    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body[0].title).toBe("Jurassic Park");

  });

});