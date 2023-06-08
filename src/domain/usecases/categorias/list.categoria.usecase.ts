import { IUseCase } from "../usecase.interface";
import { ICategoriaRepository } from "../../repositories/categoria.repository.interface";
import { ICategoriaEntity } from "../../entities/categorias/categoria.entity";
import categoriaRepository from "../../../adapters/repositories/categoria.repository";

class ListCategoriaUseCase implements IUseCase {

    constructor(private _repository: ICategoriaRepository) {

    }

    async execute(): Promise<ICategoriaEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListCategoriaUseCase(
    categoriaRepository
);