// Classe que define o modelo de Livro
export interface LivroProps {
  id: string;
  title: string;
  author: string;
  published: Date;
  format: string;
  genres: string[];
  language: string;
}

export interface LivroData {
  title: string;
  author: string;
  published: Date;
  format: string;
  genres: string[];
  language: string;
}

export class Livro {
  id: string;
  title: string;
  author: string;
  published: Date;
  format: string;
  genres: string[];
  language: string;

  constructor({
    id,
    title,
    author,
    published,
    format,
    genres,
    language
  }: LivroProps) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.published = published;
    this.format = format;
    this.genres = genres;
    this.language = language;
  }
}