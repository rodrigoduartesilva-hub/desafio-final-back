import { IUseCase } from "../usecase.interface";
import { IProdutoRepository } from "../../repositories/produto.repository.interface";
import { IProdutoEntity } from "../../entities/produtos/produto.entity";
import produtoRepository from "../../../adapters/repositories/produto.repository";

class CreateProdutoUseCase implements IUseCase {

    constructor(private _repository: IProdutoRepository) {

    }

    async execute(data: IProdutoEntity): Promise<IProdutoEntity | undefined> {
        return await this._repository.create(data);
    }
}

export default new CreateProdutoUseCase(
    produtoRepository
);