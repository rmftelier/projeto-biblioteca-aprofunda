import request from "supertest";
import app from "@infra/server/server";
import { userModel } from "@infra/database/models/mongooseUserModel";
import { bookModel } from "@infra/database/models/mongooseBookModel";

export async function createTestAdminAndGetToken() {
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

  return login.body.token;
}

export async function clearDatabase() {
  await userModel.deleteMany({});
  await bookModel.deleteMany({});
}