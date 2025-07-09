import { Book } from '../../core/entities/Book';
import { BookRepository } from "../../core/repositories/BookRepository";

export class InMemoryBookRepository implements BookRepository {
  public books: Book[] = [];

  async getAll(): Promise<Book[]> {
    return this.books;
  }

  async getById(id: string): Promise<Book | null> {
    const book = this.books.find((book) => book.id === id);

    return book || null;
  }

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  async updateById(book: Book): Promise<void> {
    const index = this.books.findIndex((livro) => livro.id === livro.id)

    if (index !== -1) {
      this.books[index] = book
    }
  }

  async deleteById(id: string): Promise<void> {
    this.books = this.books.filter((book) => book.id !== id);
  }

}