import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe("DELETE /users/:id", () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it("deve retornar 204 quando remover um usuário com sucesso", async () => {

    const { body } = await request(app)
      .post("/register")
      .send({
        name: 'Joan Fontaine',
        login: 'joan',
        password: 'fontaine123',
        email: 'jfontaine@email.com',
        role: 'admin',
        borrowedBooksId: []
      });

    const login = await request(app).post('/login').send({
      login: 'joan',
      password: 'fontaine123'
    });

    console.log(body.id);
    token = login.body.token;

    const response = await request(app)
      .delete(`/users/${body.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204);
  });

  it("deve retornar 404 quando tentar remover um usuário inexistente", async () => {
    const { body } = await request(app)
      .post("/register")
      .send({
        name: 'Joan Fontaine',
        login: 'joan',
        password: 'fontaine123',
        email: 'jfontaine@email.com',
        role: 'admin',
        borrowedBooksId: []
      });

    const login = await request(app).post('/login').send({
      login: 'joan',
      password: 'fontaine123'
    });

    token = login.body.token;

    const fakeId = new Types.ObjectId(); // gera um ObjectId válido aleatório

    const response = await request(app)
      .delete(`/users/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Usuário não encontrado');
  });

});