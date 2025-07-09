import { Request, Response } from 'express';
import { bookRepository } from '../../infra/database/repositoryInstance';

export class GetBookByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const book = await bookRepository.getById(id);

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      return res.status(200).json(book);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

