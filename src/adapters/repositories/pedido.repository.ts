import { IPedidoEntity } from "../../domain/entities/pedidos/pedido.entity"
import { IPedidoRepository } from "../../domain/repositories/pedido.repository.interface";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import * as Sequelize from 'sequelize';
import pedidosModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/pedidos.models.mysql.database";

class PedidoRepository implements IPedidoRepository {
    private _type: string = 'IPedido';

    constructor(
        private _database: IDatabaseModel,
        private _modelPedidos: Sequelize.ModelCtor<Sequelize.Model<any, any>>
        ){
    }

    async readById(resourceId: number): Promise<IPedidoEntity | undefined> {
        const pedido = await this._database.read(this._modelPedidos, resourceId);
        return pedido;
    }

    async create(resource: IPedidoEntity): Promise<IPedidoEntity> {
        const pedido = await this._database.create(this._modelPedidos, resource);
        pedido.idpedido = pedido.null;
        return pedido;
    }

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._modelPedidos, {idpedido: resourceId});
    }

    async list(): Promise<IPedidoEntity[]> {
        return this._database.list(this._modelPedidos);
    }

    async updateById(resource: IPedidoEntity): Promise<IPedidoEntity | undefined> {
        let pedidoModel = await this._database.read(this._modelPedidos, resource.idpedido);
        await this._database.update(pedidoModel, resource);
        return resource;
    }
}

export default new PedidoRepository(
    MysqlDatabase.getInstance(),
    pedidosModelsMysqlDatabase
);