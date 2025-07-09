import { Book } from "../../core/entities/Book";
import { UpdateBook } from "../../core/usecases/UpdateBook";
import { bookRepository } from "../../infra/database/repositoryInstance";

describe('UpdateBook (UseCase)', () => {
  let book: Book

  beforeEach(() => {
    bookRepository.books = [];
    book = new Book(
      '1',
      'Jurassic Park',
      'Michael Crichton',
      '2015-06-12',
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      new Date().toLocaleDateString('pt-br')
    )
    bookRepository.books.push(book);
  });

  it('deve atualizar um livro existente com sucesso', async () => {
    const updateBook = new UpdateBook(bookRepository);

    const update = await updateBook.execute(book.id, { genres: ['Ficção Científica'] });

    expect(update.genres).toEqual(['Ficção Científica']);
  })

});