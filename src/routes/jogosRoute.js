import { Router } from "express";
import * as JogosController from './../controllers/jogosController.js'

const router = Router();

router.get("/", JogosController.listarTodos);
router.get("/:id", JogosController.listarUm);
router.post("/", JogosController.criar);
router.delete("/:id", JogosController.deletar);
router.put("/:id", JogosController.atualizar);

export default router;