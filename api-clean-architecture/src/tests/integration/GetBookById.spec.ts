import request from "supertest";
import app from "../../infra/server/server";

describe("GET /books/:id", () => {
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

  it('deve retornar o livro com o id correspondente corretamente', async () => {

    const response = await request(app).get(`/books/${bookId}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Jurassic Park");
    expect(response.body).toHaveProperty("id", bookId);
    expect(response.body).toHaveProperty("author", "Michael Crichton")

  });

  it('deve retornar o status 404 caso o livro não seja encontrado', async () => {
    const response = await request(app).get("/books/123456");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Livro não encontrado");

  });
});