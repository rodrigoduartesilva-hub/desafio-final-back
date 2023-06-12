import { IUseCase } from "../usecase.interface";
import { IProdutoRepository } from "../../repositories/produto.repository.interface";
import { IProdutoEntity } from "../../entities/produtos/produto.entity";
import produtoRepository from "../../../adapters/repositories/produto.repository";

class ListProdutoUseCase implements IUseCase {

    constructor(private _repository: IProdutoRepository) {

    }

    async execute(): Promise<IProdutoEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListProdutoUseCase(
    produtoRepository
);