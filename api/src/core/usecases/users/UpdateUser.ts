import { UserRepository } from "@core/repositories/UserRepository";
import { User } from "@core/entities/User";

export interface IUpdateUser {
  name?: string;
  login?: string;
  password?: string;
  email?: string;
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) { }

  async execute(id: string, data: IUpdateUser): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (data.name) user.name = data.name;
    if (data.login) user.login = data.login;
    if (data.password) user.password = data.password;
    if (data.email) user.email = data.email;

    const updatedUser = await this.userRepository.update(user);

    return updatedUser;
  }
}