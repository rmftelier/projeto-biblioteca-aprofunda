import { Book } from '@core/entities/Book';
import { BookRepository } from "@core/repositories/BookRepository";

export class InMemoryBookRepository implements BookRepository {
  public books: Book[] = [];

  async getAll(): Promise<Book[]> {
    return [...this.books];
  }

  async findById(id: string): Promise<Book | null> {
    const book = this.books.find((book) => book.id === id);

    return book || null;
  }

  async findByTitle(title: string): Promise<Book | null> {
    const book = this.books.find((book) => book.title === title);

    return book || null;
  }

  async save(book: Book): Promise<Book> {

    const existingIndex = this.books.findIndex(b => b.id == book.id);

    if (existingIndex >= 0) {
      this.books[existingIndex] = book;
      return this.books[existingIndex];
    } else {
      this.books.push(book);
      return book;
    }
  }

  async update(book: Book): Promise<Book | null> {
    const index = this.books.findIndex((b) => b.id === book.id);

    if (index !== -1) {
      this.books[index] = book
      return book;
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    this.books = this.books.filter((book) => book.id !== id);
  }

}
