import { ReturnBook } from "@core/usecases/users/ReturnBook";
import { Book } from "@core/entities/Book";
import { User } from "@core/entities/User";
import { InMemoryBookRepository } from "@infra/database/repositories/inMemory/inMemoryBookRepository";
import { InMemoryUserRepository } from "@infra/database/repositories/inMemory/inMemoryUserRepository";

describe('ReturnBook (UseCase)', () => {
  let userRepository: InMemoryUserRepository;
  let bookRepository: InMemoryBookRepository;
  let returnBook: ReturnBook;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    bookRepository = new InMemoryBookRepository();
    returnBook = new ReturnBook(bookRepository, userRepository);
  });

  it('deve devolver um livro com sucesso', async () => {

    const user = new User(
      'Example',
      'example',
      '123456',
      'example@email.com',
      'admin',
      ['10'],
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

    await returnBook.execute('1', 'Jurassic Park');

    const updatedBook = await bookRepository.findById('10');
    const updatedUser = await userRepository.findById('1');

    expect(updatedBook?.status).toBe('available');
    expect(updatedUser?.borrowedBooksId).not.toContain('10');
  });

  it('deve lançar erro se o usuário não existir', async () => {
    await expect(returnBook.execute('2', 'Título')).rejects
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

    await expect(returnBook.execute('1', 'Livro Inexistente')).rejects
      .toThrow('Esse título não existe na biblioteca')
  });

  it('deve lançar erro se o livro não estiver emprestado por esse usuário', async () => {
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

    await expect(returnBook.execute('1', 'Jurassic Park')).rejects
      .toThrow('Esse livro não foi emprestado por esse usuário');
  });
})