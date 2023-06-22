import { IProdutoEntity } from "../produtos/produto.entity";

export interface IPedidoEntity {
    idpedido: number,
    valor: number,
    produtos: IProdutoEntity[]
}