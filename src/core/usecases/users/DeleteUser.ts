import { UserRepository } from "@core/repositories/UserRepository";

export class DeleteUser {
  constructor(private userRepository: UserRepository) { }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  }
}