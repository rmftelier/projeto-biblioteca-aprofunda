import { Request, Response } from 'express';
import { DeleteBook } from '../../core/usecases/DeleteBook';
import { bookRepository } from '../../infra/database/repositoryInstance';

export class DeleteBookByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteBook = new DeleteBook(bookRepository);

    try {
      if (!id) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      await deleteBook.execute(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}