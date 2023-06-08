import { IUseCase } from "../usecase.interface";
import { ICategoriaRepository } from "../../repositories/categoria.repository.interface";
import { ICategoriaEntity } from "../../entities/categorias/categoria.entity";
import categoriaRepository from "../../../adapters/repositories/categoria.repository";

class UpdateCategoriaUseCase implements IUseCase {

    constructor(private _repository: ICategoriaRepository) {

    }

    async execute(data: ICategoriaEntity): Promise<ICategoriaEntity | undefined> {
        return await this._repository.updateById(data);
    }
}

export default new UpdateCategoriaUseCase(
    categoriaRepository
);