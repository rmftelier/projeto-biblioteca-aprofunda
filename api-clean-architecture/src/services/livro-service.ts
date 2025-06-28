// Regras de negócio relacionadas aos livros
import LivroStorage from "../storage/livro-storage";
import livroFactory from "../factories/livro-factory";
import { LivroData } from "../models/livro-model";

interface Livro extends LivroData {
  id: string;
}

export default {
  criarLivro: ({ title, author, published, format, genres, language }: LivroData): Livro => {

    const dataConvertida = new Date(published);

    const novoLivro = livroFactory.criar({ title, author, published: dataConvertida, format, genres, language });

    LivroStorage.add(novoLivro);

    return novoLivro;
  },

  getAllTexts: (): Livro[] => {
    return LivroStorage.getAll();
  }
}
