import { IUseCase } from "../usecase.interface";
import { ICategoriaRepository } from "../../repositories/categoria.repository.interface";
import { ICategoriaEntity } from "../../entities/categorias/categoria.entity";
import categoriaRepository from "../../../adapters/repositories/categoria.repository";

class ReadCategoriaUseCase implements IUseCase {

    constructor(private _repository: ICategoriaRepository) {

    }

    async execute(data: { idcategoria: number}): Promise<ICategoriaEntity | undefined> {
        return await this._repository.readById(data.idcategoria);
    }
}

export default new ReadCategoriaUseCase(
    categoriaRepository
);