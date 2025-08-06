import request from "supertest";
import app from "@infra/server/server";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { userModel } from "@infra/database/models/mongooseUserModel";

describe('PATCH /users/:id', () => {
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


  it('deve alterar o nome do usuário', async () => {

    const { body } = await request(app)
      .post("/register")
      .send({
        name: 'Yaya Urassaya',
        login: 'yaya',
        password: '123456',
        role: 'admin',
        email: 'urassaya@email.com',
        borrowedBooksId: []
      });

    const login = await request(app).post('/login').send({
      login: 'yaya',
      password: '123456'
    });

    token = login.body.token;

    const response = await request(app)
      .patch(`/users/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Yaya Urassaya Sperbund"
      });

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("Yaya Urassaya Sperbund");
  });

  it("deve retornar 404 quando o id for inválido", async () => {

    const { body } = await request(app)
      .post("/register")
      .send({
        name: 'Yaya Urassaya',
        login: 'yaya',
        password: '123456',
        role: 'admin',
        email: 'urassaya@email.com',
        borrowedBooksId: []
      });

    const login = await request(app).post('/login').send({
      login: 'yaya',
      password: '123456'
    });

    token = login.body.token;

    const fakeId = new Types.ObjectId();

    const response = await request(app)
      .patch(`/books/${fakeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: "Dom Casmurro"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Livro não encontrado");

  });
});