import { UserRepository } from "@core/repositories/UserRepository";
import { User } from "@core/entities/User";

export class GetAllUsers {
  constructor(private userRepository: UserRepository) { }

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}