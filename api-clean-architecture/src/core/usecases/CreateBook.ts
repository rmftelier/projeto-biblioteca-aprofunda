import { randomUUID } from "crypto";
import { Book } from "../entities/Book";
import { BookRepository } from "../repositories/BookRepository";

export interface ICreateBookInput {
  title: string;
  author: string;
  publishedAt: string;
  format: string;
  pages: number;
  genres: string[];
  language: string;
  createdAt: string;
};

export class CreateBook {
  constructor(private bookRepository: BookRepository) { }

  async execute(data: ICreateBookInput): Promise<Book> {

    const book = new Book(
      randomUUID(),
      data.title,
      data.author,
      data.publishedAt,
      data.format,
      data.pages,
      data.genres,
      data.language,
      data.createdAt
    );

    await this.bookRepository.save(book);

    return book;
  }
}