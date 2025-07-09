import { BookRepository } from "../repositories/BookRepository";

export class DeleteBook {
  constructor(private bookRepository: BookRepository) { }

  async execute(id: string): Promise<void> {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new Error('Livro não encontrado');
    }

    await this.bookRepository.deleteById(id);
  }
}