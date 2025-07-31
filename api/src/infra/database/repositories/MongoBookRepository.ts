import { Book } from "@core/entities/Book";
import { BookRepository } from "@core/repositories/BookRepository";
import { bookModel } from "../models/mongooseBookModel";

export class MongoBookRepository implements BookRepository {

  private toEntity(doc: any): Book {
    return new Book(
      doc.title,
      doc.author,
      doc.publishedYear,
      doc.format,
      doc.pages,
      doc.genres,
      doc.language,
      doc.status,
      doc._id.toString()
    );
  }

  async getAll(): Promise<Book[]> {
    const docs = await bookModel.find();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<Book | null> {
    const doc = await bookModel.findOne({ _id: id });

    return doc ? this.toEntity(doc) : null;
  }

  async findByTitle(title: string): Promise<Book | null> {
    const doc = await bookModel.findOne({ title });

    return doc ? this.toEntity(doc) : null;
  }

  async save(book: Book): Promise<Book> {
    const doc = await bookModel.create(book);

    return this.toEntity(doc);
  }

  async update(book: Book): Promise<Book | null> {
    const doc = await bookModel.findByIdAndUpdate(
      book.id,
      {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        format: book.format,
        pages: book.pages,
        genres: book.genres,
        language: book.language,
        status: book.status
      },
      { new: true }
    );

    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await bookModel.findOneAndDelete({ _id: id });
  }

}