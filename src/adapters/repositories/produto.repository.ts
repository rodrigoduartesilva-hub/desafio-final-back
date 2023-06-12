import { IProdutoEntity } from "../../domain/entities/produtos/produto.entity"
import { IPedidoRepository } from "../../domain/repositories/pedido.repository.interface";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import * as Sequelize from 'sequelize';
import produtosModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/produtos.models.mysql.database";

class ProdutoRepository implements IPedidoRepository {
    private _type: string = 'IProduto';

    constructor(
        private _database: IDatabaseModel,
        private _modelProdutos: Sequelize.ModelCtor<Sequelize.Model<any, any>>
        ){
    }

    async readById(resourceId: number): Promise<IProdutoEntity | undefined> {
        const produto = await this._database.read(this._modelProdutos, resourceId);
        return produto;
    }

    async create(resource: IProdutoEntity): Promise<IProdutoEntity> {
        const produto = await this._database.create(this._modelProdutos, resource);
        produto.idproduto = produto.null;
        return produto;
    }

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._modelProdutos, {idproduto: resourceId});
    }

    async list(): Promise<IProdutoEntity[]> {
        return this._database.list(this._modelProdutos);
    }

    async updateById(resource: IProdutoEntity): Promise<IProdutoEntity | undefined> {
        let produtoModel = await this._database.read(this._modelProdutos, resource.idproduto);
        await this._database.update(produtoModel, resource);
        return resource;
    }
}

export default new ProdutoRepository(
    MysqlDatabase.getInstance(),
    produtosModelsMysqlDatabase
);