import { Book } from "@core/entities/Book";
import { UpdateBook } from "@core/usecases/books/UpdateBook";
import { InMemoryBookRepository } from "@infra/database/inMemoryBookRepository";

describe('UpdateBook (UseCase)', () => {
  let bookRepository: InMemoryBookRepository;
  let book: Book;

  beforeEach(() => {
    bookRepository = new InMemoryBookRepository();

    const newBook = new Book(
      'Jurassic Park',
      'Michael Crichton',
      2015,
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      '1'
    );

    bookRepository.save(newBook);
    book = newBook;

  });

  it('deve atualizar um livro existente com sucesso', async () => {

    const updateBook = new UpdateBook(bookRepository);

    const updateData = {
      title: 'Orgulho e Preconceito',
      genres: ['Romance'],
      publishedYear: 2024
    }

    const updatedBook = await updateBook.execute('1', updateData);

    expect(updatedBook).toBeInstanceOf(Book);
    expect(updatedBook?.title).toBe('Orgulho e Preconceito');
    expect(updatedBook?.author).toEqual('Michael Crichton');
    expect(updatedBook?.publishedYear).toEqual(2024);
    expect(updatedBook?.format).toEqual('Físico');
    expect(updatedBook?.pages).toEqual(528);
    expect(updatedBook?.genres).toEqual(['Romance']);
    expect(updatedBook?.language).toEqual('Português');
  });

  it('deve manter os campos anteriores se o data estiver vazio.', async () => {

    const updateBook = new UpdateBook(bookRepository);

    const update = await updateBook.execute(book.id as string, {});

    expect(update).toEqual(book);
  });

  it('não deve alterar nada se o livro não existir no repositório', async () => {

    const updateBook = new UpdateBook(bookRepository);

    await expect(
      updateBook.execute('99', { title: 'Novo Título' })
    ).rejects.toThrow('Livro não encontrado');

  });

  it('deve atualizar os campos: title, author, format, pages e language com sucesso',
    async () => {

      const updateBook = new UpdateBook(bookRepository);

      const update = await updateBook.execute(book.id as string, {
        title: 'Em um porão escuro',
        author: 'Cara Hunter',
        format: 'Ebook',
        pages: 376,
        language: 'Português de Portugal'

      });

      expect(update?.title).toEqual('Em um porão escuro');
      expect(update?.format).toEqual('Ebook');
      expect(update?.pages).toEqual(376);
      expect(update?.language).toEqual('Português de Portugal');
      expect(update?.publishedYear).toEqual(2015);
    });

});






