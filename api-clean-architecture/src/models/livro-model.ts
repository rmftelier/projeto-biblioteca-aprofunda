export interface LivroProps {
  id: string;
  titulo: string;
  escritor: string;
  dataPublicacao: string;
  formato: string;
  qtdPaginas: number;
  generos: string[];
  idioma: string;
  criadoEm: string;
}

export interface LivroData {
  titulo: string;
  escritor: string;
  dataPublicacao: string;
  formato: string;
  qtdPaginas: number;
  generos: string[];
  idioma: string;
}

export class Livro {
  id: string;
  titulo: string;
  escritor: string;
  dataPublicacao: string;
  formato: string;
  qtdPaginas: number;
  generos: string[];
  idioma: string;
  criadoEm: string;

  constructor({
    id,
    titulo,
    escritor,
    dataPublicacao,
    formato,
    qtdPaginas,
    generos,
    idioma,
    criadoEm
  }: LivroProps) {
    this.id = id;
    this.titulo = titulo;
    this.escritor = escritor;
    this.dataPublicacao = dataPublicacao;
    this.formato = formato;
    this.qtdPaginas = qtdPaginas;
    this.generos = generos;
    this.idioma = idioma;
    this.criadoEm = criadoEm;
  }
}