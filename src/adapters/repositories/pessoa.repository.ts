import { IPessoaEntity } from "../../domain/entities/pessoas/pessoa.entity"
import { IPessoaRepository } from "../../domain/repositories/pessoa.repository.interface";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import * as Sequelize from 'sequelize';
import pessoasModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/pessoas.models.mysql.database";

class PessoaRepository implements IPessoaRepository {
    private _type: string = 'IPessoa';

    constructor(
        private _database: IDatabaseModel,
        private _modelPessoas: Sequelize.ModelCtor<Sequelize.Model<any, any>>
        ){
    }

    async readById(resourceId: number): Promise<IPessoaEntity | undefined> {
        const pessoa = await this._database.read(this._modelPessoas, resourceId);
        return pessoa;
    }

    async create(resource: IPessoaEntity): Promise<IPessoaEntity> {
        const pessoa = await this._database.create(this._modelPessoas, resource);
        pessoa.idpessoa = pessoa.null;
        return pessoa;
    }

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._modelPessoas, {idpessoa: resourceId});
    }

    async list(): Promise<IPessoaEntity[]> {
        return this._database.list(this._modelPessoas);
    }

    async updateById(resource: IPessoaEntity): Promise<IPessoaEntity | undefined> {
        let pessoaModel = await this._database.read(this._modelPessoas, resource.idpessoa);
        await this._database.update(pessoaModel, resource);
        return resource;
    }
}

export default new PessoaRepository(
    MysqlDatabase.getInstance(),
    pessoasModelsMysqlDatabase
);