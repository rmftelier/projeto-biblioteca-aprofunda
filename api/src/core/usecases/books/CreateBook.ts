import { Book } from "@core/entities/Book";
import { BookRepository } from "@core/repositories/BookRepository";

export interface ICreateBookInput {
  title: string;
  author: string;
  publishedYear: number;
  format: string;
  pages: number;
  genres: string[];
  language: string;
};

export class CreateBook {
  constructor(private bookRepository: BookRepository) { }

  async execute(data: ICreateBookInput): Promise<Book> {


    const book = new Book(
      data.title,
      data.author,
      data.publishedYear,
      data.format,
      data.pages,
      data.genres,
      data.language
    );

    const newBook = await this.bookRepository.save(book);

    return newBook;
  }
}