import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";
import { bookModel } from "@infra/database/models/mongooseBookModel";

describe("DELETE /books/:id", () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
    await bookModel.deleteMany({});

    await request(app).post('/register').send({
      name: 'Admin',
      login: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      role: 'admin',
      borrowedBooksId: []
    });

    const login = await request(app).post('/login').send({
      login: 'admin',
      password: 'admin123'
    });

    token = login.body.token;

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