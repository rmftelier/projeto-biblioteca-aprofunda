import { Request, Response } from "express";
import livroService from "../services/livro-service";

// GET
export const listarLivros = (req: Request, res: Response): void => {
  const livros = livroService.listarTodosLivros();
  res.json(livros);
}

// GET ID
export const buscarLivro = (req: Request, res: Response): void => {
  const { id } = req.params;

  const livro = livroService.buscarLivroPorId(id as string);

  if (!livro) {
    res
      .status(404)
      .json({ message: `Livro com o id: ${id} não foi encontrado.` });

    return;
  };

  res.json(livro);
};

// POST
export const cadastrarLivro = (req: Request, res: Response): void => {
  const {
    titulo,
    escritor,
    dataPublicacao,
    formato,
    qtdPaginas,
    generos,
    idioma } = req.body;

  const novoLivro = livroService.cadastrarNovoLivro(
    {
      titulo,
      escritor,
      dataPublicacao,
      formato,
      qtdPaginas,
      generos,
      idioma
    }
  );

  res
    .status(201)
    .json(
      {
        message: `O livro: ${novoLivro.titulo} foi cadastrado com sucesso!`,
        novoLivro
      }
    );
};

// PUT 
export const atualizarLivro = (req: Request, res: Response): void => {
  const { id } = req.params;
  const data = req.body;

  const atualizarLivro = livroService.atualizarLivroPorId(id, data);

  if (!atualizarLivro) {
    res.status(404).json({ message: `Livro com o id: ${id} não foi encontrado.` });
    return;
  }

  res.json({ message: `Livro com id: ${id} foi editado com sucesso.` });
};

// DELETE
export const excluirLivro = (req: Request, res: Response): void => {
  const { id } = req.params;

  livroService.excluirLivroPorId(id);

  const listaLivrosAtualizada = livroService.listarTodosLivros();

  res.json(
    {
      message: `Livro com o id: ${id} foi excluído com sucesso.`,
      listaLivrosAtualizada
    }
  );
}