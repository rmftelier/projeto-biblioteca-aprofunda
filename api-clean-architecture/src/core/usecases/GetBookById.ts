import { BookRepository } from "../repositories/BookRepository";
import { Book } from "../entities/Book";

export class GetBookById {
  constructor(private bookRepository: BookRepository) { }

  async execute(id: string): Promise<Book | null> {
    return this.bookRepository.getById(id);
  }
}