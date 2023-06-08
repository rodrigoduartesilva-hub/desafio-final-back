import { IUseCase } from "../usecase.interface";
import { ICategoriaRepository } from "../../repositories/categoria.repository.interface";
import { ICategoriaEntity } from "../../entities/categorias/categoria.entity";
import categoriaRepository from "../../../adapters/repositories/categoria.repository";

class DeleteCategoriaUseCase implements IUseCase {

    constructor(private _repository: ICategoriaRepository) {

    }

    async execute(data: { idcategoria: number}): Promise<void> {
        return await this._repository.deleteById(data.idcategoria);
    }
}

export default new DeleteCategoriaUseCase(
    categoriaRepository
);