import { Book } from "../entities/Book";

export interface BookRepository {
  getAll(): Promise<Book[]>;
  getById(id: string): Promise<Book | null>;
  save(book: Book): Promise<void>;
  deleteById(id: string): Promise<void>;
}