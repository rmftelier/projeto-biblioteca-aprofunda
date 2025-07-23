import { randomUUID } from "crypto";
import { Book } from "@core/entities/Book";
import { BookRepository } from "@core/repositories/BookRepository";

export interface ICreateBookInput {
  title: string;
  author: string;
  publishedAt: string;
  format: string;
  pages: number;
  genres: string[];
  language: string;
};

export class CreateBook {
  constructor(private bookRepository: BookRepository) { }

  async execute(data: ICreateBookInput): Promise<Book> {

    const formattedDate = new Date(data.publishedAt + 'T00:00:00').toLocaleDateString('pt-BR');

    const book = new Book(
      randomUUID(),
      data.title,
      data.author,
      formattedDate,
      data.format,
      data.pages,
      data.genres,
      data.language,
      new Date().toLocaleDateString('pt-br')
    );

    await this.bookRepository.save(book);

    return book;
  }
}