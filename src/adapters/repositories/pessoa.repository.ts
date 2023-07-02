import { IPessoaEntity } from "../../domain/entities/pessoas/pessoa.entity"
import { IPessoaRepository } from "../../domain/repositories/pessoa.repository.interface";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IDatabaseModel } from "../../infrastructure/persistence/databasemodel.interface";
import * as Sequelize from 'sequelize';
import pessoasModelsMysqlDatabase from "../../infrastructure/persistence/mysql/models/pessoas.models.mysql.database";
import bcrypt from 'bcrypt';
import { TipoUsuario } from "../../domain/entities/pessoas/tipousuario.entity";

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

    async readByUser(resource: IPessoaEntity): Promise<IPessoaEntity | undefined >{
        const { nome, email, senha, tipoUsuario } = resource;

        const user = await this._database.readByWhere(this._modelPessoas, {resource});

        if(resource.tipoUsuario = TipoUsuario.Admin){
            return user;
        }
    }


    async create(resource: IPessoaEntity ): Promise<IPessoaEntity | undefined >  {
           
        const { nome, email, senha, tipoUsuario} = resource;

        const userExists = await this._database.readByWhere(this._modelPessoas, { email: email });

        if(userExists){
            return ;
        }

        const hashSenha = await bcrypt.hash(senha, 10);


        const pessoa = await this._database.create(this._modelPessoas, {
            nome, 
            email,
            senha: hashSenha,
            tipoUsuario
        });


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

    async readByUserPass(user: string, pass: string): Promise<IPessoaEntity | undefined> {
        try{
           
            const pessoa = await this._database.readByWhere(this._modelPessoas, { email: user});
           bcrypt.compareSync
           if(bcrypt.compareSync(pass, pessoa.senha)){
            return pessoa
           } else{
            return;
           }
        } catch(err){
            throw new Error((err as Error).message);
        }
    }
}

export default new PessoaRepository(
    MysqlDatabase.getInstance(),
    pessoasModelsMysqlDatabase
);