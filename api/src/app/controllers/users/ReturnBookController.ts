import { Request, Response } from "express";
import { bookRepository } from "@infra/database/repositoryInstance";
import { userRepository } from "@infra/database/repositoryInstance";
import { ReturnBook } from "@core/usecases/users/ReturnBook";

export class ReturnBookController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title } = req.body;

    try {
      const returnBook = new ReturnBook(bookRepository, userRepository);

      await returnBook.execute(id, title);

      return res.status(201).json({ message: "Livro devolvido com sucesso." });

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}