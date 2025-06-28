//Define as rotas da aplicação
import express from "express";
import { criarLivro, listarLivros } from "../controllers/biblioteca-controller";

const router = express.Router();

//Aqui eu tenho que passar o negócio do controller sabeh
router.post("/livro", criarLivro);
router.get("/livros", listarLivros);

export default router;