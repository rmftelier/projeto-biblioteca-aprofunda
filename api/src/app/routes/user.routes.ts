import { Router } from "express";
import { GetAllUsersController } from "@app/controllers/users/GetAllUsersController";
import { GetUserByIdController } from "@app/controllers/users/GetUserByIdController";
import { CreateUserController } from "@app/controllers/users/CreateUserController";
import { UpdateUserByIdController } from "@app/controllers/users/UpdateUserByIdController";
import { DeleteUserByIdController } from "@app/controllers/users/DeleteUserByIdController";

const router = Router();

const getAllUsersController = new GetAllUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();
const updateUserByIdController = new UpdateUserByIdController();
const deleteUserByIdController = new DeleteUserByIdController();


router.get("/users", async (req, res) => {
  await getAllUsersController.handle(req, res);
});

router.get("/users/:id", async (req, res) => {
  await getUserByIdController.handle(req, res);
});

router.post("/users", async (req, res) => {
  await createUserController.handle(req, res);
});

router.patch("/users/:id", async (req, res) => {
  await updateUserByIdController.handle(req, res);
});

router.delete("/users/:id", async (req, res) => {
  await deleteUserByIdController.handle(req, res);
});

export { router as userRoutes };


