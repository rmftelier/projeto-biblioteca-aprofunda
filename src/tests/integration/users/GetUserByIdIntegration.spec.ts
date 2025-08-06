import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe("GET /users/:id", () => {
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

  it('deve retornar o usuário com o id correspondente corretamente', async () => {

    const { body } = await request(app)
      .post("/register")
      .send({
        name: 'Namtan Tipnaree',
        login: 'namtan.tipnaree',
        password: '13love',
        email: 'namtan@email.com',
        role: 'user',
        borrowedBooksId: []
      });

    const login = await request(app).post('/login').send({
      login: 'namtan.tipnaree',
      password: '13love'
    });

    token = login.body.token;

    const response = await request(app)
      .get(`/users/${body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Namtan Tipnaree');
    expect(response.body).toHaveProperty("id", body.id);
    expect(response.body).toHaveProperty("login", "namtan.tipnaree");

  });

  it('deve retornar o status 404 caso o usuário não seja encontrado', async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app)
      .get(`/users/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Usuário não encontrado');
  });

});



