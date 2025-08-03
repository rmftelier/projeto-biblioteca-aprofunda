import { User } from "@core/entities/User";
import { UserRepository } from "@core/repositories/UserRepository";


export class InMemoryUserRepository implements UserRepository {

  public users: User[] = [];

  async getAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = this.users.find((user) => user.login === login);

    return user || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  };

  async update(user: User): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.users[index] = user;
      return user;
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
