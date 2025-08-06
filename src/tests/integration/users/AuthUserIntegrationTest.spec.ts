import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe("POST /login", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it("deve retornar um token quando o login for bem sucedido", async () => {

    await request(app)
      .post("/register")
      .send({
        name: 'Song Zu Er',
        login: 'songzuer',
        password: '123song',
        email: 'zuer@email.com',
        borrowedBooksId: []
      });

    //login
    const response = await request(app).post('/login').send({
      login: 'songzuer',
      password: '123song'
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("deve retornar o erro 401 quando as credenciais são inválidas", async () => {

    await request(app)
      .post("/register")
      .send({
        name: 'Liu Yu Ning',
        login: 'liuyuning',
        password: '123yuning',
        email: 'yuning@email.com',
        borrowedBooksId: []
      });

    //login
    const response = await request(app).post('/login').send({
      login: 'liu',
      password: '123yuni'
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Credenciais inválidas');
    expect(response.body.token).not.toBeDefined();

  });

  it("deve retornar o erro 401 quando a senha estiver incorreta", async () => {
    await request(app)
      .post("/register")
      .send({
        name: 'Bai Lu',
        login: 'bailu',
        password: 'senhaCorreta',
        email: 'bailu@email.com',
        borrowedBooksId: []
      });

    const response = await request(app).post('/login').send({
      login: 'bailu',
      password: 'senhaErrada'
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Senha inválida');
    expect(response.body.token).not.toBeDefined();
  });

});