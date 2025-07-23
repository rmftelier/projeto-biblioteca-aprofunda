import { BookRepository } from "@core/repositories/BookRepository";
import { Book } from "@core/entities/Book";

export class GetAllBooks {
  constructor(private bookRepository: BookRepository) { }

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }
}