import { ICategoriaEntity } from "../../domain/entities/categorias/categoria.entity"
import { ICategoriaRepository } from "../../domain/repositories/categoria.repository.interface";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import * as Sequelize from 'sequelize';
import categoriasModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/categorias.models.mysql.database";

class CategoriaRepository implements ICategoriaRepository {
    private _type: string = 'ICategoria';

    constructor(
        private _database: IDatabaseModel,
        private _modelCategorias: Sequelize.ModelCtor<Sequelize.Model<any, any>>
        ){
    }

    async readById(resourceId: number): Promise<ICategoriaEntity | undefined> {
        const categoria = await this._database.read(this._modelCategorias, resourceId);
        return categoria;
    }

    async create(resource: ICategoriaEntity): Promise<ICategoriaEntity> {
        const categoria = await this._database.create(this._modelCategorias, resource);
        categoria.idcategoria = categoria.null;
        return categoria;
    }

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._modelCategorias, {idcategoria: resourceId});
    }

    async list(): Promise<ICategoriaEntity[]> {
        return this._database.list(this._modelCategorias);
    }

    async updateById(resource: ICategoriaEntity): Promise<ICategoriaEntity | undefined> {
        let categoriaModel = await this._database.read(this._modelCategorias, resource.idcategoria);
        await this._database.update(categoriaModel, resource);
        return resource;
    }
}

export default new CategoriaRepository(
    MysqlDatabase.getInstance(),
    categoriasModelsMysqlDatabase
);