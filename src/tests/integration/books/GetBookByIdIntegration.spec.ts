import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";
import { bookModel } from "@infra/database/models/mongooseBookModel";

describe("GET /books/:id", () => {
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

  it('deve retornar o livro com o id correspondente corretamente', async () => {

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

    const response = await request(app).get(`/books/${body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Jurassic Park");
    expect(response.body).toHaveProperty("id", body.id);
    expect(response.body).toHaveProperty("author", "Michael Crichton");

  });

  it('deve retornar o status 404 caso o livro não seja encontrado', async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app).get(`/books/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Livro não encontrado');
  });

});