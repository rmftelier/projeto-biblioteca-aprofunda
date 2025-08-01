import { Book } from "@core/entities/Book";
import { CreateBook } from "@core/usecases/books/CreateBook";
import { InMemoryBookRepository } from "@infra/database/inMemoryBookRepository";

describe('CreateBook (UseCase)', () => {

  let bookRepository: InMemoryBookRepository;

  beforeEach(() => {
    bookRepository = new InMemoryBookRepository();
  });

  it('deve criar um novo livro e armazenar no repositório', async () => {
    const createBook = new CreateBook(bookRepository);

    const book = await createBook.execute({
      title: 'Jurassic Park',
      author: 'Michael Crichton',
      publishedYear: 2015,
      format: 'Físico',
      pages: 528,
      genres: ['Ficção Científica', 'Ação', 'Aventura'],
      language: 'Português',
    });

    expect(book).toBeInstanceOf(Book);
    expect(book.title).toBe('Jurassic Park');
    expect(book.status).toBe('available');
    expect(book.genres.every(item => typeof item === 'string')).toBe(true);
    expect(bookRepository.books).toHaveLength(1);
  })
})