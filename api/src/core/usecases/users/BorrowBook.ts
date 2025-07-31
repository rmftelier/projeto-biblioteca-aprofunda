import { BookRepository } from "@core/repositories/BookRepository";
import { UserRepository } from "@core/repositories/UserRepository";

export class BorrowBook {
  constructor(
    private bookRepository: BookRepository,
    private userRepository: UserRepository
  ) { }

  async execute(userId: string, title: string) {

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("Esse usuário não existe");
    }

    const book = await this.bookRepository.findByTitle(title);

    if (!book) {
      throw new Error("Esse título não existe na biblioteca");
    }

    if (book.status == 'borrowed') {
      throw new Error("Esse título já foi emprestado");
    }

    book.status = 'borrowed';
    await this.bookRepository.update(book);

    user.borrowedBooksId.push(book.id!);
    await this.userRepository.update(user);
  }
}