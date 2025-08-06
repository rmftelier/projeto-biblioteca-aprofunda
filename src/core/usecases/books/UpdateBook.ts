import { BookRepository } from "@core/repositories/BookRepository";

export interface IUpdateBookInput {
  title?: string;
  author?: string;
  publishedYear?: number;
  format?: string;
  pages?: number;
  genres?: string[];
  language?: string;
};

export class UpdateBook {
  constructor(private bookRepository: BookRepository) { }

  async execute(id: string, data: IUpdateBookInput) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error('Livro não encontrado');
    }

    if (data.title) book.title = data.title;
    if (data.author) book.author = data.author;
    if (data.publishedYear) book.publishedYear = data.publishedYear;
    if (data.format) book.format = data.format;
    if (data.pages) book.pages = data.pages;
    if (data.genres) book.genres = data.genres;
    if (data.language) book.language = data.language;

    const updatedBook = await this.bookRepository.update(id, book);

    return updatedBook;
  }
}