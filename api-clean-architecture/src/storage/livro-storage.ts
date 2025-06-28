import { Livro, LivroProps } from "../models/livro-model";

class LivroStorage {
  private static instance: LivroStorage;
  private livros: LivroProps[] = [];

  private constructor() { }

  private findIndexById(id: string): number {
    return this.livros.findIndex(livro => livro.id === id);
  }

  public static getInstance(): LivroStorage {
    if (!LivroStorage.instance) {
      LivroStorage.instance = new LivroStorage();
    }
    return LivroStorage.instance;
  }

  public getAll(): LivroProps[] {
    return this.livros;
  }

  public getById(id: string): Livro | undefined {
    return this.livros.find((livro) => livro.id === id);
  }

  public add(livro: LivroProps): void {
    this.livros.push(livro);
  }

  public updateById(id: string, livroAtualizado: LivroProps): void {
    const index = this.findIndexById(id);

    if (index !== -1) {
      this.livros[index] = livroAtualizado;
    }
  }

  public deleteBookById(id: string): Livro[] {
    const index = this.findIndexById(id);

    return this.livros.splice(index, 1);
  }
};

export default LivroStorage.getInstance();