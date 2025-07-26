import { CreateUser } from '@core/usecases/users/CreateUser';
import { userRepository } from '@infra/database/repositoryInstance';
import { Request, Response } from 'express';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, login, password, email } = req.body;

    try {
      const createUser = new CreateUser(userRepository);

      const user = await createUser.execute({ name, login, password, email });

      return res.status(201).json(user);

    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}