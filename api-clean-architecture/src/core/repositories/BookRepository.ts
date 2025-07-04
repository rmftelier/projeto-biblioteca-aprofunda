import { Book } from "../entities/Book";

export interface BookRepository {
  getAll(): Promise<Book[]>;
  getById(id: string): Promise<Book | undefined>;
  save(book: Book): Promise<void>;
  //revisar essa parte
  updateById(id: string): Promise<void>;
  deleteById(id: string): Promise<void>;
}