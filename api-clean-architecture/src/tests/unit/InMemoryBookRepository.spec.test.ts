import { InMemoryBookRepository } from "../../infra/database/inMemoryBookRepository";
import { Book } from "../../core/entities/Book";

describe('InMemoryBookRepository', () => {

  it('deve atualizar um livro existente no repositório', async () => {
    const repository = new InMemoryBookRepository();

    const originalBook = new Book(
      '1',
      'Jurassic Park',
      'Michael Crichton',
      '2015-06-12',
      'Físico',
      528,
      ['Ficção Científica'],
      'Português',
      '12/06/2015'
    );

    await repository.save(originalBook);

    const updatedBook = new Book(
      '1', // mesmo ID
      'O Mundo Perdido',
      'Michael Crichton',
      '2016-01-01',
      'Digital',
      400,
      ['Aventura'],
      'Português',
      '01/01/2016'
    );

    await repository.update(updatedBook);

    const allBooks = await repository.getAll();
    expect(allBooks).toHaveLength(1);
    expect(allBooks[0].title).toBe('O Mundo Perdido');
  });

  it('não deve fazer nada se o livro não existir no repositório', async () => {
    const repository = new InMemoryBookRepository();

    const nonExistentBook = new Book(
      '999', // ID que não foi salvo antes
      'Livro Fantasma',
      'Autor Invisível',
      '1999-01-01',
      'Digital',
      100,
      ['Fantasia'],
      'Português',
      '01/01/1999'
    );

    await repository.update(nonExistentBook);

    const allBooks = await repository.getAll();
    expect(allBooks).toHaveLength(0); // Nenhum livro foi adicionado nem alterado
  });

});
