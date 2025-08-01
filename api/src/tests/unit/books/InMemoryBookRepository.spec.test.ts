import { InMemoryBookRepository } from "@infra/database/inMemoryBookRepository";
import { Book } from "@core/entities/Book";

describe('InMemoryBookRepository', () => {

  let bookRepository: InMemoryBookRepository;

  beforeEach(() => {
    bookRepository = new InMemoryBookRepository();
  });

  it('deve atualizar um livro existente no repositório', async () => {

    const originalBook = new Book(
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

    await bookRepository.save(originalBook);

    const updatedBook = new Book(
      'O Mundo Perdido',
      'Michael Crichton',
      2016,
      'Digital',
      400,
      ['Aventura'],
      'Português',
      'available',
      '1' // mesmo ID
    );

    await bookRepository.update(updatedBook);

    expect(bookRepository.books).toHaveLength(1);
    expect(bookRepository.books[0].title).toBe('O Mundo Perdido');
    expect(bookRepository.books[0].format).toBe('Digital');
  });

  it('não deve fazer nada se o livro não existir no repositório', async () => {

    const nonExistentBook = new Book(

      'Livro Fantasma',
      'Autor Invisível',
      1999,
      'Digital',
      100,
      ['Fantasia'],
      'Português',
      'available',
      '999' // ID que não foi salvo antes
    );

    await bookRepository.update(nonExistentBook);

    const allBooks = await bookRepository.getAll();
    expect(allBooks).toHaveLength(0); // Nenhum livro foi adicionado nem alterado
  });


  it('deve atualizar um livro se ele já existe', async () => {

    const originalBook = new Book(
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

    await bookRepository.save(originalBook);

    const updatedBook = new Book(
      'Sem Saída',
      'Cara Hunter',
      2019,
      'Edição Kindle',
      377,
      ['Thriller', 'Mistério', 'Ficção'],
      'Português',
      'available',
      '1'
    );

    const savedBook = await bookRepository.save(updatedBook);

    expect(bookRepository.books).toHaveLength(1);
    expect(bookRepository.books[0].title).toBe('Sem Saída');
    expect(savedBook).toEqual(updatedBook);

  });


  it('deve encontrar um livro pelo título', async () => {
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

    const getBookByTitle = await bookRepository.findByTitle(book.title);

    expect(getBookByTitle?.title).toBe('Jurassic Park');
    expect(getBookByTitle?.id).toBe('1');
    expect(getBookByTitle?.pages).toBe(528);
    expect(getBookByTitle?.status).toBe('available');
  });

  it('deve retornar null se o livro com o título não for encontrado', async () => {

    const getBookByTitle = await bookRepository.findByTitle('Título inexistente');

    expect(getBookByTitle).toBeNull();
  });

});
