import { User } from "@core/entities/User";

export interface UserRepository {
  getAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
}