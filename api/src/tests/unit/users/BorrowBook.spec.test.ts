import { BorrowBook } from "@core/usecases/users/BorrowBook";
import { Book } from "@core/entities/Book";
import { User } from "@core/entities/User";
import { InMemoryBookRepository } from "@infra/database/repositories/inMemory/inMemoryBookRepository";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";

describe('BorrowBook (UseCase)', () => {
  let userRepository: InMemoryUserRepository;
  let bookRepository: InMemoryBookRepository;
  let borrowBook: BorrowBook;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    bookRepository = new InMemoryBookRepository();
    borrowBook = new BorrowBook(bookRepository, userRepository);
  });

  it('deve emprestar um livro com sucesso', async () => {

    const user = new User(
      'Example',
      'example',
      '123456',
      'example@email.com',
      'admin',
      [],
      '1'
    );

    const book = new Book(
      'Jurassic Park',
      'Michael Crichton',
      2015,
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      'available',
      '10'
    );

    await userRepository.save(user);
    await bookRepository.save(book);

    await borrowBook.execute('1', 'Jurassic Park');

    const updatedBook = await bookRepository.findByTitle('Jurassic Park');
    const updatedUser = await userRepository.findById('1');

    expect(updatedBook?.status).toBe('borrowed');
    expect(updatedUser?.borrowedBooksId).toContain('10');
  });

  it('deve lançar erro se o usuário não existir', async () => {
    await expect(borrowBook.execute('2', 'Título')).rejects
      .toThrow('Esse usuário não existe');
  });

  it('deve lançar erro se o livro não existir', async () => {
    const user = new User(
      'Example',
      'example',
      '123456',
      'example@email.com',
      'admin',
      [],
      '1'
    );

    await userRepository.save(user);

    await expect(borrowBook.execute('1', 'Livro Inexistente')).rejects
      .toThrow('Esse título não existe na biblioteca')
  });

  it('deve lançar erro se o livro já estiver emprestado', async () => {
    const user = new User(
      'Example',
      'example',
      '123456',
      'example@email.com',
      'admin',
      [],
      '1'
    );

    const book = new Book(
      'Jurassic Park',
      'Michael Crichton',
      2015,
      'Físico',
      528,
      ['Ficção Científica', 'Ação', 'Aventura'],
      'Português',
      'borrowed',
      '10'
    );

    await userRepository.save(user);
    await bookRepository.save(book);

    await expect(borrowBook.execute('1', 'Jurassic Park')).rejects
      .toThrow('Esse título já foi emprestado');
  });
})