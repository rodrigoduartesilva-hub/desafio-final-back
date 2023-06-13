import { IUseCase } from "../usecase.interface";
import { IPedidoRepository } from "../../repositories/pedido.repository.interface";
import { IPedidoEntity } from "../../entities/pedidos/pedido.entity";
import pedidoRepository from "../../../adapters/repositories/pedido.repository";

class DeletePedidoUseCase implements IUseCase {

    constructor(private _repository: IPedidoRepository) {

    }

    async execute(data: { idpedido: number}): Promise<void> {
        return await this._repository.deleteById(data.idpedido);
    }
}

export default new DeletePedidoUseCase(
    pedidoRepository
);