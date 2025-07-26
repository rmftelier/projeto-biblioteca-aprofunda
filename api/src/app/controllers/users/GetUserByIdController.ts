import { GetUserById } from "@core/usecases/users/GetUserById";
import { userRepository } from "@infra/database/repositoryInstance";
import { Request, Response } from "express";


export class GetUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const getUserById = new GetUserById(userRepository);

      const user = await getUserById.execute(id);

      return res.status(200).json(user);

    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}