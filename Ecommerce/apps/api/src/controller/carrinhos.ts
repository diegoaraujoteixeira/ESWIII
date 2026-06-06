import { Request, Response } from "express";
import { Carrinho } from "../model/carrinho";
import {
  CarrinhoRepository,
  carrinhoRepository,
} from "../repository/carrinhos";

function isCarrinho(body: unknown): body is Carrinho {
  if (!body || typeof body !== "object") {
    return false;
  }

  const carrinho = body as Partial<Carrinho>;

  return Array.isArray(carrinho.itens);
}

export class CarrinhoController {
  constructor(
    private readonly repository: CarrinhoRepository = carrinhoRepository,
  ) {}

  // GET /carrinhos/ultimo
  async showUltimo(req: Request, res: Response): Promise<void> {
    const carrinho = await this.repository.findLast();

    res.status(200).json(carrinho ?? { itens: [] });
  }

  // POST /carrinhos/ultimo
  async storeUltimo(req: Request, res: Response): Promise<void> {
    if (!isCarrinho(req.body)) {
      res.status(400).json({ message: "Carrinho inválido" });
      return;
    }

    const carrinho = await this.repository.create(req.body);

    res.status(201).json(carrinho);
  }
}
