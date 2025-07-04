//Puxa o bookRepository quando não é necessário fazer nenhuma mudança,
//caso seja precisamos chamar um dos useCase
import { Request, Response } from 'express';
import { bookRepository } from "../../infra/database/repositoryInstance";

export class GetAllBooksController {

  async handle(req: Request, res: Response): Promise<Response> {

    try {
      const books = await bookRepository.getAll();

      return res.status(200).json(books);

    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}