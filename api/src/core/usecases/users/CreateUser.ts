import { User } from "@core/entities/User";
import { UserRepository } from "@core/repositories/UserRepository";
import bcrypt from "bcrypt";

export interface ICreateUserInput {
  name: string,
  login: string,
  password: string,
  email: string
}

export class CreateUser {
  constructor(private userRepository: UserRepository) { }

  async execute(data: ICreateUserInput): Promise<User> {

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
      data.name,
      data.login,
      hashPassword,
      data.email
    );

    const newUser = await this.userRepository.save(user);

    return newUser;
  };
};