import { Book } from "@core/entities/Book";
import { GetBookById } from "@core/usecases/books/GetBookById";
import { InMemoryBookRepository } from "@infra/database/inMemoryBookRepository";

describe('GetBookById (UseCase)', () => {
  let bookRepository: InMemoryBookRepository;

  beforeEach(() => {
    bookRepository = new InMemoryBookRepository();
  });

  it('deve retornar o livro com o id correspondente corretamente', async () => {

    const book = new Book(
      'Jurassic Park',
      'Michael Crichton',
      2015,
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      'available',
      '1',
    );

    await bookRepository.save(book);

    const getBookById = new GetBookById(bookRepository);

    const correspondingBook = await getBookById.execute('1');

    expect(correspondingBook?.title).toBe('Jurassic Park');
    expect(correspondingBook?.id).toBe('1');
    expect(correspondingBook?.pages).toBe(528);
  });
});