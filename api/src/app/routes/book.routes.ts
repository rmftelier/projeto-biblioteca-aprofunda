import { Router } from 'express';
import { GetAllBooksController } from "@app/controllers/books/GetAllBooksController";
import { GetBookByIdController } from "@app/controllers/books/GetBookByIdController";
import { CreateBookController } from "@app/controllers/books/CreateBookController";
import { UpdateBookByIdController } from "@app/controllers/books/UpdateBookByIdController";
import { DeleteBookByIdController } from "@app/controllers/books/DeleteBookByIdController";
import { authenticate } from '@shared/middlewares/authMiddleware';
import { isAdmin } from '@shared/middlewares/roleMiddleware';

const router = Router();

const getAllBooksController = new GetAllBooksController();
const getBookByIdController = new GetBookByIdController();
const createBookController = new CreateBookController();
const updateBookByIdController = new UpdateBookByIdController();
const deleteBookByIdController = new DeleteBookByIdController();

router.get("/books", async (req, res) => {
  await getAllBooksController.handle(req, res);
});

router.get("/books/:id", async (req, res) => {
  await getBookByIdController.handle(req, res);
});

router.post("/books", authenticate, isAdmin, async (req, res) => {
  await createBookController.handle(req, res);
});

router.patch("/books/:id", authenticate, isAdmin, async (req, res) => {
  await updateBookByIdController.handle(req, res);
});

router.delete("/books/:id", authenticate, isAdmin, async (req, res) => {
  await deleteBookByIdController.handle(req, res);
});

export { router as bookRoutes };