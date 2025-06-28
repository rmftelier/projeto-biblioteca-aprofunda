//Lida com as requisições e respostas
import { Request, Response } from "express";
import livroService from "../services/livro-service";

export const criarLivro = (req: Request, res: Response): void => {
  const { title, author, published, format, genres, language } = req.body;

  //Como passar o published? avaliar o problema daqui a pouco
  const dataConvertida = new Date(published);

  // Verificação de data inválida
  if (isNaN(dataConvertida.getTime())) {
    res.status(400).json({ message: "Data de publicação inválida." });
  }

  const novoLivro = livroService.criarLivro({ title, author, published: dataConvertida, format, genres, language });

  res
    .status(201)
    .json({ message: `Livro: ${novoLivro.title} foi cadastrado com sucesso!` });
};

export const listarLivros = (req: Request, res: Response): void => {
  const livros = livroService.getAllTexts();
  res.json(livros);
}
