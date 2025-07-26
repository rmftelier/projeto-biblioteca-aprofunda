import { User } from "@core/entities/User";
import { UserRepository } from "@core/repositories/UserRepository";

export interface ICreateUserInput {
  name: string,
  login: string,
  password: string,
  email: string
}

export class CreateUser {
  constructor(private userRepository: UserRepository) { }

  async execute(data: ICreateUserInput): Promise<User> {

    const user = new User(
      data.name,
      data.login,
      data.password,
      data.email
    );

    const newUser = await this.userRepository.save(user);

    return newUser;
  };
};