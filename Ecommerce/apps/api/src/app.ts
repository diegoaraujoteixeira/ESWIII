import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

// Importando as rotas dos produtos
import listarprodutos from "./route/produtos";
import destaquesprodutos from "./route/produtos";
import novidadesprodutos from "./route/produtos";
import promocoesprodutos from "./route/produtos";
import detalhesproduto from "./route/produtos";

// Importando a rota de categorias de produtos
import cateogoriasprodutos from "./route/categorias";

// Importando as rotas dos usuários
import usuarios from "./route/usuarios";

// Importando as rotas do carrinho
import carrinhos from "./route/carrinhos";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// Configurando as rotas dos produtos
app.use(listarprodutos);
app.use(destaquesprodutos);
app.use(novidadesprodutos);
app.use(promocoesprodutos);
app.use(detalhesproduto);

// Configurando a rota de categorias de produtos
app.use(cateogoriasprodutos);

// Configurando as rotas dos usuários
app.use(usuarios);

// Configurando as rotas do carrinho
app.use(carrinhos);

app.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: "Erro inesperado" });
  },
);

export default app;
