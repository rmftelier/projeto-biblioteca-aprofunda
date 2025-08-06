import { GetAllUsers } from "@core/usecases/users/GetAllUsers";
import { userRepository } from "@infra/database/repositoryInstance";
import { Request, Response } from "express";

export class GetAllUsersController {
   async handle(req: Request, res: Response): Promise<Response> {

      try {
         const getAllUsers = new GetAllUsers(userRepository);

         const users = await getAllUsers.execute();

         return res.status(200).json(users);

      } catch (error: any) {
         return res.status(500).json({ error: error.message });
      }
   }
}