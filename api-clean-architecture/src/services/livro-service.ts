import LivroStorage from "../storage/livro-storage";
import livroFactory from "../factories/livro-factory";
import { LivroData } from "../models/livro-model";
import { formataISOParaBR } from "../utils/formata-data";

interface Livro extends LivroData {
  id: string;
  criadoEm: string;
}

export default {
  listarTodosLivros: (): Livro[] => {
    return LivroStorage.getAll();
  },

  buscarLivroPorId: (id: string): Livro | undefined => {
    return LivroStorage.getById(id);
  },

  cadastrarNovoLivro: (
    {
      titulo,
      escritor,
      dataPublicacao,
      formato,
      qtdPaginas,
      generos,
      idioma
    }: LivroData): Livro => {

    const novoLivro = livroFactory.criar(
      {
        titulo,
        escritor,
        dataPublicacao: formataISOParaBR(dataPublicacao) || "",
        formato,
        qtdPaginas,
        generos,
        idioma
      }
    );

    LivroStorage.add(novoLivro);

    return novoLivro;
  },

  atualizarLivroPorId: (id: string, data: LivroData): Livro | null => {
    const livro = LivroStorage.getById(id);

    if (!livro) {
      return null;
    }

    const livroAtualizado: Livro = {
      ...livro,
      ...data,
      dataPublicacao: formataISOParaBR(data.dataPublicacao) || ""
    };

    LivroStorage.updateById(id, livroAtualizado);

    return livroAtualizado;
  },

  excluirLivroPorId: (id: string): Livro[] => {
    return LivroStorage.deleteBookById(id);
  }

};
