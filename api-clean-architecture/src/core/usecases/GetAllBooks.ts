import { BookRepository } from "../repositories/BookRepository";
import { Book } from "../entities/Book";

export class GetAllBooks {
  constructor(private bookRepository: BookRepository) { }

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }
}