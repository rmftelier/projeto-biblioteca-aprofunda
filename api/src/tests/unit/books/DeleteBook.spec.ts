import { Book } from "@core/entities/Book";
import { DeleteBook } from "@core/usecases/books/DeleteBook";
import { InMemoryBookRepository } from "@infra/database/repositories/inMemory/inMemoryBookRepository";

describe('DeleteBook (UseCase)', () => {
  let bookRepository: InMemoryBookRepository;

  beforeEach(() => {
    bookRepository = new InMemoryBookRepository();
  });

  it('deve excluir um livro existente com sucesso', async () => {
    const book = new Book(
      'Jurassic Park',
      'Michael Crichton',
      2015,
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      'available',
      '1'
    );

    await bookRepository.save(book);

    const deleteBook = new DeleteBook(bookRepository);
    await deleteBook.execute(book.id as string);

    const deletedBook = await bookRepository.findById(book.id!);
    expect(deletedBook).toBeNull();
  });

  it("deve lançar um erro ao tentar deletar um livro inexistente", async () => {
    const deleteBook = new DeleteBook(bookRepository);

    await expect(deleteBook.execute('id-inexistente')).rejects.toThrow();
  })

});