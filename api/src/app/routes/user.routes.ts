import { Router } from "express";
import { GetAllUsersController } from "@app/controllers/users/GetAllUsersController";
import { GetUserByIdController } from "@app/controllers/users/GetUserByIdController";
import { CreateUserController } from "@app/controllers/users/CreateUserController";
import { UpdateUserByIdController } from "@app/controllers/users/UpdateUserByIdController";
import { DeleteUserByIdController } from "@app/controllers/users/DeleteUserByIdController";
import { AuthUserController } from "@app/controllers/users/AuthUserController";
import { autenticar } from "@shared/middlewares/authMiddleware";

const userRoutes = Router();

const getAllUsersController = new GetAllUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();
const updateUserByIdController = new UpdateUserByIdController();
const deleteUserByIdController = new DeleteUserByIdController();
const authUserController = new AuthUserController();


userRoutes.post("/login", async (req, res) => {
  await authUserController.handle(req, res);
})

userRoutes.get("/users", async (req, res) => {
  await getAllUsersController.handle(req, res);
});

userRoutes.get("/users/:id", async (req, res) => {
  await getUserByIdController.handle(req, res);
});

userRoutes.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

userRoutes.patch("/users/:id", autenticar, async (req, res) => {
  await updateUserByIdController.handle(req, res);
});

userRoutes.delete("/users/:id", autenticar, async (req, res) => {
  await deleteUserByIdController.handle(req, res);
});

export { userRoutes };


