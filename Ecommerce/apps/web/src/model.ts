export type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  destaque?: boolean;
  promocao?: boolean;
  novidade?: boolean;
};

export type Categoria = {
  id: number;
  categoria: string;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export type ItemCarrinho = Produto & {
  quantidade: number;
};

export type Carrinho = {
  itens: ItemCarrinho[];
};
