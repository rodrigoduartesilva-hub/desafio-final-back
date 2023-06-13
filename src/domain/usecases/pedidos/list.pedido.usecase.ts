import { IUseCase } from "../usecase.interface";
import { IPedidoRepository } from "../../repositories/pedido.repository.interface";
import { IPedidoEntity } from "../../entities/pedidos/pedido.entity";
import pedidoRepository from "../../../adapters/repositories/pedido.repository";

class ListPedidoUseCase implements IUseCase {

    constructor(private _repository: IPedidoRepository) {

    }

    async execute(): Promise<IPedidoEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListPedidoUseCase(
    pedidoRepository
);