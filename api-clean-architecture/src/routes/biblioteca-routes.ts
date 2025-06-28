//Define as rotas da aplicação
import express from "express";
import { criarLivro, listarLivros, buscarLivro, excluirLivro, atualizarLivro } from "../controllers/biblioteca-controller";

const router = express.Router();

//Aqui eu tenho que passar o negócio do controller sabeh
router.post("/livro", criarLivro);

router.get("/livros", listarLivros);

router.get("/livro/:id", buscarLivro);

router.put("/livro/:id", atualizarLivro);

router.delete("/livro/:id", excluirLivro);
export default router;