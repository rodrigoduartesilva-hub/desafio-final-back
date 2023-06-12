import { IUseCase } from "../usecase.interface";
import { IProdutoRepository } from "../../repositories/produto.repository.interface";
import produtoRepository from "../../../adapters/repositories/produto.repository";

class DeleteProdutoUseCase implements IUseCase {

    constructor(private _repository: IProdutoRepository) {

    }

    async execute(data: { idcategoria: number}): Promise<void> {
        return await this._repository.deleteById(data.idcategoria);
    }
}

export default new DeleteProdutoUseCase(
    produtoRepository
);