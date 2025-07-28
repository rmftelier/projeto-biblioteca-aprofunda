import { User } from "@core/entities/User";
import { UserRepository } from "@core/repositories/UserRepository";
import bcrypt from "bcrypt";

export interface ICreateUserInput {
  name: string,
  login: string,
  password: string,
  email: string,
  role: 'admin' | 'user'
}

export class CreateUser {
  constructor(private userRepository: UserRepository) { }

  async execute(data: ICreateUserInput): Promise<User> {

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
      data.name,
      data.login,
      hashPassword,
      data.email,
      data.role
    );

    const newUser = await this.userRepository.save(user);

    return newUser;
  };
};