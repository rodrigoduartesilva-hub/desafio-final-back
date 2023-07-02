import { IPessoaEntity } from '../entities/pessoas/pessoa.entity';

export interface IPessoaRepository {
    [x: string]: any;
    readById(resourceId: number): Promise<IPessoaEntity | undefined>,
    create(resource: IPessoaEntity): Promise<IPessoaEntity | undefined>,
    readByUserPass(user: string, pass: string): Promise<IPessoaEntity | undefined>,
    deleteById(resourceId: number): Promise<void>,
    list(): Promise<IPessoaEntity[]>,
    updateById(resource: IPessoaEntity): Promise<IPessoaEntity | undefined>,
    readByUser(resource: IPessoaEntity):  Promise<IPessoaEntity | undefined>
}