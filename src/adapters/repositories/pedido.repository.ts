import { IPedidoEntity } from "../../domain/entities/pedidos/pedido.entity"
import { IPedidoRepository } from "../../domain/repositories/pedido.repository.interface";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import * as Sequelize from 'sequelize';
import pedidosModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/pedidos.models.mysql.database";
import produtosModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/produtos.models.mysql.database";
import pessoasModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/pessoas.models.mysql.database";

class PedidoRepository implements IPedidoRepository {
    private _type: string = 'IPedido';

    constructor(
        private _database: IDatabaseModel,
        private _modelPedidos: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelProdutos: Sequelize.ModelCtor<Sequelize.Model<any, any>>,
        private _modelPessoas: Sequelize.ModelCtor<Sequelize.Model<any, any>>
        ){
            this._modelPedidos.hasMany(this._modelProdutos, {
                foreignKey: 'idproduto',
                as: 'produto'
            });
            this._modelPedidos.hasOne(this._modelPessoas, {
                foreignKey: 'idpessoa',
                as: 'pessoa'
            });
    }

    async readById(resourceId: number): Promise<IPedidoEntity | undefined> {
        try {
            const pedido = await this._database.read(this._modelPedidos, resourceId, {
                include: [
                    'produto'
                ]
            });
            return pedido;
        } catch (error) {
            throw new Error((error as Error).message);
        }
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
    pedidosModelsMysqlDatabase,
    produtosModelsMysqlDatabase,
    pessoasModelsMysqlDatabase
);