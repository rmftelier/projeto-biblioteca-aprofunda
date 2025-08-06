import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe('GET /users', () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it('deve retornar todos os usuários cadastrados com sucesso', async () => {

    await request(app).post('/register').send({
      name: 'Namtan Tipnaree',
      login: 'namtan.tipnaree',
      password: '13love',
      email: 'namtan@email.com',
      role: 'admin',
      borrowedBooksId: []
    });

    const login = await request(app).post('/login').send({
      login: 'namtan.tipnaree',
      password: '13love'
    });

    token = login.body.token;

    const response = await request(app)
      .get("/users")
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });

});