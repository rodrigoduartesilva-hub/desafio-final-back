import { IProdutoEntity } from '../entities/produtos/produto.entity';

export interface IProdutoRepository {
    readById(resourceId: number): Promise<IProdutoEntity | undefined>,
    create(resource: IProdutoEntity): Promise<IProdutoEntity>,
    deleteById(resourceId: number): Promise<void>,
    list(): Promise<IProdutoEntity[]>,
    updateById(resource: IProdutoEntity): Promise<IProdutoEntity | undefined>
}