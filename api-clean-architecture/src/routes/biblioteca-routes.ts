import express from "express";
import {
  listarLivros,
  buscarLivro,
  cadastrarLivro,
  atualizarLivro,
  excluirLivro
} from "../controllers/biblioteca-controller";

const router = express.Router();

router.get("/livros", listarLivros);

router.get("/livros/:id", buscarLivro);

router.post("/livros", cadastrarLivro);

router.put("/livros/:id", atualizarLivro);

router.delete("/livros/:id", excluirLivro);

export default router;