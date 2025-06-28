//Lida com as requisições e respostas
import { Request, Response } from "express";
import livroService from "../services/livro-service";

// POST
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

// GET
export const listarLivros = (req: Request, res: Response): void => {
  const livros = livroService.getAllTexts();
  res.json(livros);
}

// GET ID -> /livro/:id
export const buscarLivro = (req: Request, res: Response): void => {
  const { id } = req.params;

  const livro = livroService.buscarLivro(id as string);

  if (!livro) {
    res.status(404).json({ message: `Livro com o ID ${id} não encontrado.` });
    return;
  }

  res.json(livro);
};

// PUT -> /livro
export const atualizarLivro = (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    res.status(400).json({ message: "Corpo da requisição está vazio ou ausente." });
    return;
  }

  if (!data.published) {
    res.status(400).json({ message: "O campo 'published' é obrigatório." });
    return;
  }

  const dataConvertida = new Date(data.published);
  if (isNaN(dataConvertida.getTime())) {
    res.status(400).json({ message: "Data de publicação inválida." });
    return;
  }

  console.log("Req.body recebido: ", data);

  const updateLivro = livroService.atualizandoLivro(id, { ...data, published: dataConvertida });

  if (!updateLivro) {
    res.status(404).json({ message: `Livro com o id: ${id} não foi encontrado` });
    return;
  } else {
    res.json({ message: `Livro com id: ${id} foi editado com sucesso.` });

  }
}

// DELETE /livro
export const excluirLivro = (req: Request, res: Response): void => {
  const { id } = req.params;

  //Tenho que organizar isso aqui
  const biblotecaAtualizada = livroService.deleteLivroById(id);

  res.json({ message: `Texto com ${id} excluído com sucesso`, biblotecaAtualizada });
}