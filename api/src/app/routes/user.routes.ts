import { Router } from "express";
import { GetAllUsersController } from "@app/controllers/users/GetAllUsersController";
import { GetUserByIdController } from "@app/controllers/users/GetUserByIdController";
import { CreateUserController } from "@app/controllers/users/CreateUserController";
import { UpdateUserByIdController } from "@app/controllers/users/UpdateUserByIdController";
import { DeleteUserByIdController } from "@app/controllers/users/DeleteUserByIdController";
import { BorrowBookController } from "@app/controllers/users/BorrowBookController";
import { ReturnBookController } from "@app/controllers/users/ReturnBookController";
import { AuthUserController } from "@app/controllers/users/AuthUserController";
import { authenticate } from "@shared/middlewares/authMiddleware";
import { isAdmin } from "@shared/middlewares/roleMiddleware";

const router = Router();

const getAllUsersController = new GetAllUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();
const updateUserByIdController = new UpdateUserByIdController();
const deleteUserByIdController = new DeleteUserByIdController();
const borrowBookController = new BorrowBookController();
const returnBookController = new ReturnBookController();
const authUserController = new AuthUserController();

router.post("/login", async (req, res) => {
  await authUserController.handle(req, res);
});

router.post("/register", async (req, res) => {
  await createUserController.handle(req, res);
});

router.get("/users", authenticate, isAdmin, async (req, res) => {
  await getAllUsersController.handle(req, res);
});

router.get("/users/:id", authenticate, async (req, res) => {
  await getUserByIdController.handle(req, res);
});

router.patch("/users/:id", authenticate, isAdmin, async (req, res) => {
  await updateUserByIdController.handle(req, res);
});

router.delete("/users/:id", authenticate, isAdmin, async (req, res) => {
  await deleteUserByIdController.handle(req, res);
});

router.post("/users/:id/borrowBook", authenticate, async (req, res) => {
  await borrowBookController.handle(req, res);
});

router.post("/users/:id/returnBook", authenticate, async (req, res) => {
  await returnBookController.handle(req, res);
});

export { router as userRoutes };