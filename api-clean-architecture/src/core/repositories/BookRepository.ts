import { Book } from "../entities/Book";

export interface BookRepository {
  getAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  save(book: Book): Promise<void>;
  delete(id: string): Promise<void>;
}