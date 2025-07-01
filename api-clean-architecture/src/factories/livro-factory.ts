import { v4 as uuidv4 } from 'uuid';
import { Livro, LivroData } from '../models/livro-model';

export default {
  criar: ({
    titulo,
    escritor,
    dataPublicacao,
    formato,
    qtdPaginas,
    generos,
    idioma
  }: LivroData): Livro => {
    return new Livro({
      id: uuidv4(),
      titulo,
      escritor,
      dataPublicacao,
      formato,
      qtdPaginas,
      generos,
      idioma,
      criadoEm: new Date().toLocaleDateString('pt-BR')
    });
  },
};