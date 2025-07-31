import { Book } from "@core/entities/Book";

export interface BookRepository {
  getAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  findByTitle(title: string): Promise<Book | null>;
  save(book: Book): Promise<Book>;
  update(book: Book): Promise<Book | null>;
  delete(id: string): Promise<void>;
}