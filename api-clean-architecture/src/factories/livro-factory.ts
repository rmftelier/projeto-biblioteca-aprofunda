// Criação de objetos Livro (Factory Pattern)
import { v4 as uuidv4 } from 'uuid';
import { Livro, LivroData } from '../models/livro-model';

export default {
  criar: ({
    title,
    author,
    published,
    format,
    genres,
    language
  }: LivroData): Livro => {
    return new Livro({
      id: uuidv4(),
      title,
      author,
      published,
      format,
      genres,
      language
    })
  }
}