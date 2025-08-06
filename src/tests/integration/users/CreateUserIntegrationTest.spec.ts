import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe("POST /register", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it("deve criar um novo usuário com sucesso", async () => {

    const response = await request(app)
      .post("/register")
      .send({
        name: 'Namtan Tipnaree',
        login: 'namtan.tipnaree',
        password: '13love',
        email: 'namtan@email.com',
        borrowedBooksId: []
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Namtan Tipnaree');
    expect(response.body.role).toBe('user');
    expect(response.body).toBeDefined();
  });

});