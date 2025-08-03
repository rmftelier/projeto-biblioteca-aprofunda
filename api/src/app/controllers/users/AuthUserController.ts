import { Request, Response } from "express";
import { userRepository } from "@infra/database/repositoryInstance";
import { AuthUser } from "@core/usecases/users/AuthUser";

export class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body;

    try {
      const authUser = new AuthUser(userRepository);
      const token = await authUser.execute({ login, password });
      return res.status(200).json({ token });
    } catch (error: any) {

      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({ error: error.message });
      }

      if (error.message === 'Senha inválida') {
        return res.status(401).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}