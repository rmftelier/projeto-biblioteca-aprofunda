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
}

export default LivroStorage.getInstance();