import request from "supertest";

import app from "../../infra/server/server";

describe("POST /books", () => {
  it("deve criar um novo livro com sucesso", async () => {

    const response = await request(app).post("/books").send({
      title: "Jurassic Park",
      author: "Michael Crichton",
      publishedAt: "2015-06-12",
      format: "Físico",
      pages: 528,
      genres: ["Ficção Científica", "Ação", "Aventura"],
      language: "Português"
    });

    expect(response.status).toBe(201)
  })
})