import { UserRepository } from "@core/repositories/UserRepository";
import { User } from "@core/entities/User";


export class GetUserById {
  constructor(private userRepository: UserRepository) { }

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}