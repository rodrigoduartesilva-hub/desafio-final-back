import { IUseCase } from "../usecase.interface";
import { IProdutoRepository } from "../../repositories/produto.repository.interface";
import { IProdutoEntity } from "../../entities/produtos/produto.entity";
import produtoRepository from "../../../adapters/repositories/produto.repository";

class ReadProdutoUseCase implements IUseCase {

    constructor(private _repository: IProdutoRepository) {

    }

    async execute(data: { idproduto: number}): Promise<IProdutoEntity | undefined> {
        return await this._repository.readById(data.idproduto);
    }
}

export default new ReadProdutoUseCase(
    produtoRepository
);