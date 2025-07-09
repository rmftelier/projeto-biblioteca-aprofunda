import { Request, Response } from "express";
import { bookRepository } from "../../infra/database/repositoryInstance";

export class UpdateBookByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, author, publishedAt, format, pages, genres, language, createdAt } = req.body;

    try {
      const updateBook = await bookRepository.updateById({ id, title, author, publishedAt, format, pages, genres, language, createdAt });

      res.json(updateBook);
      return res.status(201).json({
        message: 'Livro atualizado com sucesso',
        book: updateBook
      });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}