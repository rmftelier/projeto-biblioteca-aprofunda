import { UserRepository } from "@core/repositories/UserRepository";
import { geraToken } from "@shared/helpers/jwt";

interface IAuthInput {
  login: string,
  password: string
}

export class AuthUser {
  constructor(private userRepository: UserRepository) { }
  async execute({ login, password }: IAuthInput): Promise<String> {

    const user = await this.userRepository.findByLogin(login);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const token = geraToken({ userId: user.id, login: user.login });

    return token;
  }
}