import { BookRepository } from "@core/repositories/BookRepository";
import { UserRepository } from "@core/repositories/UserRepository";

export class ReturnBook {
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

    const isBorrowed = user.borrowedBooksId
      .map((id) => id.toString())
      .includes(book.id!);

    if (!isBorrowed) {
      throw new Error("Esse livro não foi emprestado por esse usuário");
    }

    book.status = "available";
    await this.bookRepository.update(book);

    user.borrowedBooksId = user.borrowedBooksId.filter(
      (id) => id.toString() !== book.id
    );

    await this.userRepository.update(user);

  }
}