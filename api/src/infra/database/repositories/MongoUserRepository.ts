import { User } from "@core/entities/User";
import { UserRepository } from "@core/repositories/UserRepository";
import { userModel } from "../models/mongooseUserModel";

export class MongoUserRepository implements UserRepository {

  private toEntity(doc: any): User {
    return new User(
      doc.name,
      doc.login,
      doc.password,
      doc.email,
      doc.role,
      doc.borrowedBooksId.map((id: any) => id.toString()),
      doc._id.toString()
    )
  }

  async getAll(): Promise<User[]> {
    const docs = await userModel.find();
    return docs.map(this.toEntity);
  };

  async findById(id: string): Promise<User | null> {
    const doc = await userModel.findOne({ _id: id });

    return doc ? this.toEntity(doc) : null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const doc = await userModel.findOne({ login });

    return doc ? this.toEntity(doc) : null;
  }

  async save(user: User): Promise<User> {
    const doc = await userModel.create(user);

    return this.toEntity(doc);

  }

  async update(user: User): Promise<User | null> {
    const doc = await userModel.findByIdAndUpdate(
      user.id, {
      name: user.name,
      login: user.login,
      password: user.password,
      email: user.email,
      borrowedBooksId: user.borrowedBooksId
    },
      { new: true }
    );

    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await userModel.findOneAndDelete({ _id: id });
  }
}