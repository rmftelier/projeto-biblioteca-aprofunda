import { Request, Response } from 'express';
import { bookRepository } from "../../infra/database/repositoryInstance";
import { GetAllBooks } from '../../core/usecases/GetAllBooks';

export class GetAllBooksController {

  async handle(req: Request, res: Response): Promise<Response> {

    try {
      const allBooks = new GetAllBooks(bookRepository);

      const books = await allBooks.execute();

      return res.status(200).json(books);

    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}