import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { bookModel } from "@infra/database/models/mongooseBookModel";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe('GET /books', () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
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