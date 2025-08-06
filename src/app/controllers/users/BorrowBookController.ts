import { Request, Response } from 'express';
import { BorrowBook } from '@core/usecases/users/BorrowBook';
import { bookRepository, userRepository } from '@infra/database/repositoryInstance';

export class BorrowBookController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title } = req.body;

    try {
      const borrowBook = new BorrowBook(bookRepository, userRepository);

      await borrowBook.execute(id, title);

      return res.status(200).json({ message: 'Livro emprestado' });

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}