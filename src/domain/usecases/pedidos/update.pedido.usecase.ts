import { IUseCase } from "../usecase.interface";
import { IPedidoRepository } from "../../repositories/pedido.repository.interface";
import { IPedidoEntity } from "../../entities/pedidos/pedido.entity";
import pedidoRepository from "../../../adapters/repositories/pedido.repository";

class UpdatePedidoUseCase implements IUseCase {

    constructor(private _repository: IPedidoRepository) {

    }

    async execute(data: IPedidoEntity): Promise<IPedidoEntity | undefined> {
        return await this._repository.updateById(data);
    }
}

export default new UpdatePedidoUseCase(
    pedidoRepository
);