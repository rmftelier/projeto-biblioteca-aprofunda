// Armazenamento em memória (Singleton)
import { Livro, LivroProps } from "../models/livro-model";

//Implementa o Padrão Singleton para garantir que haverá apenas um livro
class LivroStorage {
  private static instance: LivroStorage;
  private livros: LivroProps[] = [];

  private constructor() { }

  public static getInstance(): LivroStorage {
    if (!LivroStorage.instance) {
      LivroStorage.instance = new LivroStorage();
    }
    return LivroStorage.instance;
  }

  public add(livro: LivroProps): void {
    this.livros.push(livro);
  }

  public getAll(): LivroProps[] {
    return this.livros;
  }

  public getById(id: string): Livro | undefined {
    return this.livros.find((livro) => livro.id === id);
  }

  public updateById(id: string, livroAtualizado: LivroProps): void {
    const index = this.livros.findIndex(livro => livro.id === id);

    if (index !== -1) {
      this.livros[index] = livroAtualizado;
    }
  }

  public deleteBookById(id: string): Livro[] {
    const index = this.livros.findIndex(livro => livro.id === id);

    return this.livros.splice(index, 1);
  }

}

export default LivroStorage.getInstance();