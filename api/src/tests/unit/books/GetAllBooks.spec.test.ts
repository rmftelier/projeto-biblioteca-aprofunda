import { Book } from "@core/entities/Book";
import { GetAllBooks } from "@core/usecases/books/GetAllBooks";
import { InMemoryBookRepository } from "@infra/database/inMemoryBookRepository";

describe('GetAllBooks (UseCase)', () => {
  let bookRepository: InMemoryBookRepository;

  beforeEach(() => {
    bookRepository = new InMemoryBookRepository();
  });

  it('deve retornar todos os livros criados', async () => {

    const book = new Book(
      'Jurassic Park',
      'Michael Crichton',
      2015,
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      '1',
    );

    await bookRepository.save(book);

    const getAllBooks = new GetAllBooks(bookRepository);

    const books = await getAllBooks.execute();

    expect(books).toHaveLength(1);
    expect(books[0].title).toBe('Jurassic Park');
  });
});