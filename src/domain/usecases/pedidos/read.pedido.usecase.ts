import { IUseCase } from "../usecase.interface";
import { IPedidoRepository } from "../../repositories/pedido.repository.interface";
import { IPedidoEntity } from "../../entities/pedidos/pedido.entity";
import pedidoRepository from "../../../adapters/repositories/pedido.repository";

class ReadPedidoUseCase implements IUseCase {

    constructor(private _repository: IPedidoRepository) {

    }

    async execute(data: { idpedido: number}): Promise<IPedidoEntity | undefined> {
        return await this._repository.readById(data.idpedido);
    }
}

export default new ReadPedidoUseCase(
    pedidoRepository
);