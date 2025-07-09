import { BookRepository } from "../repositories/BookRepository";

export interface IUpdateBookInput {
  title?: string;
  author?: string;
  publishedAt?: string;
  format?: string;
  pages?: number;
  genres?: string[];
  language?: string;
  createdAt?: string;
};

export class UpdateBook {
  constructor(private bookRepository: BookRepository) { }

  async execute(id: string, data: IUpdateBookInput) {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new Error('livro não encontrado');
    }

    if (data.title) book.title = data.title;
    if (data.author) book.author = data.author;
    if (data.publishedAt) book.publishedAt = data.publishedAt;
    if (data.format) book.format = data.format;
    if (data.pages) book.pages = data.pages;
    if (data.genres) book.genres = data.genres;
    if (data.language) book.language = data.language;
    if (data.createdAt) book.createdAt = data.createdAt;

    return book;
  }
}