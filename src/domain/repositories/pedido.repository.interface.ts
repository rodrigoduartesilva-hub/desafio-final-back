import { IPedidoEntity } from '../entities/pedidos/pedido.entity';

export interface IPedidoRepository {
    readById(resourceId: number): Promise<IPedidoEntity | undefined>,
    create(resource: IPedidoEntity): Promise<IPedidoEntity>,
    deleteById(resourceId: number): Promise<void>,
    list(): Promise<IPedidoEntity[]>,
    updateById(resource: IPedidoEntity): Promise<IPedidoEntity | undefined>
}