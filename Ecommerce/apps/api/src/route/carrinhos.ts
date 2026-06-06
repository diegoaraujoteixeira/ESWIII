import { Router } from "express";
import { CarrinhoController } from "../controller/carrinhos";

const router = Router();
const carrinhoController = new CarrinhoController();

router.get("/carrinhos/ultimo", (req, res, next) => {
  carrinhoController.showUltimo(req, res).catch(next);
});

router.post("/carrinhos/ultimo", (req, res, next) => {
  carrinhoController.storeUltimo(req, res).catch(next);
});

export default router;
