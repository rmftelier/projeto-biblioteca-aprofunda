import { Book } from '../../core/entities/Book';
import { BookRepository } from "../../core/repositories/BookRepository";

export class InMemoryBookRepository implements BookRepository {
  public books: Book[] = [];

  async getAll(): Promise<Book[]> {
    return this.books;
  }

  async getById(id: string): Promise<Book | undefined> {
    return this.books.find((book) => book.id === id);
  }

  async save(book: Book): Promise<void> {
    this.books.push(book);
  }

  //como fazer?
  async updateById(id: string): Promise<void> {
  }

  //como fazer?
  async deleteById(id: string): Promise<void> {
  }

}