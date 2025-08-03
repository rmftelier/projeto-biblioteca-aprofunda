import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { clearDatabase, createTestAdminAndGetToken } from "@tests/utils/setupTestUser";

describe("POST /books", () => {
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

  it("deve criar um novo livro com sucesso", async () => {

    const response = await request(app)
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

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('available');
    expect(response.body.title).toBe('Jurassic Park');
    expect(response.body).toBeDefined();
  });


});