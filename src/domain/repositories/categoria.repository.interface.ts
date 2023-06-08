import { ICategoriaEntity } from '../entities/categorias/categoria.entity';

export interface ICategoriaRepository {
    readById(resourceId: number): Promise<ICategoriaEntity | undefined>,
    create(resource: ICategoriaEntity): Promise<ICategoriaEntity>,
    deleteById(resourceId: number): Promise<void>,
    list(): Promise<ICategoriaEntity[]>,
    updateById(resource: ICategoriaEntity): Promise<ICategoriaEntity | undefined>
}