import { Request, Response } from "express";
import { UpdateBook } from "../../core/usecases/UpdateBook";
import { bookRepository } from "../../infra/database/repositoryInstance";

export class UpdateBookByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, author, publishedAt, format, pages, genres, language } = req.body;

    try {
      const updateBook = new UpdateBook(bookRepository);
      const book = await updateBook.execute(id, { title, author, publishedAt, format, pages, genres, language });

      return res.status(200).json({
        message: 'Livro atualizado com sucesso',
        book: book
      });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}