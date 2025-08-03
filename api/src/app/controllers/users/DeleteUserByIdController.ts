import { DeleteUser } from "@core/usecases/users/DeleteUser";
import { userRepository } from "@infra/database/repositoryInstance";
import { Request, Response } from "express";


export class DeleteUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const deleteUser = new DeleteUser(userRepository);

      await deleteUser.execute(id);

      return res.status(204).json({ message: "O usuário foi excluído com sucesso" });

    } catch (error: any) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}