import { UpdateUser } from "@core/usecases/users/UpdateUser";
import { userRepository } from "@infra/database/repositoryInstance";
import { Request, Response } from "express";



export class UpdateUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, login, password, email } = req.body;

    try {
      const updateUser = new UpdateUser(userRepository);
      const user = await updateUser.execute(id, { name, login, password, email });

      return res.status(200).json({
        message: 'Usuário atualizado com sucesso',
        user: user
      });

    } catch (error: any) {

      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}