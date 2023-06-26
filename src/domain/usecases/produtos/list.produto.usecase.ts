import { IProdutoRepository } from "../../repositories/produto.repository.interface";
import { IProdutoEntity } from "../../entities/produtos/produto.entity";
import produtoRepository from "../../../adapters/repositories/produto.repository";
import { IUseCasePaginado } from "../usecase.paginado.interface";

class ListProdutoUseCase implements IUseCasePaginado {

    constructor(private _repository: IProdutoRepository) {

    }

    async execute(limit: number, offset: number): Promise<IProdutoEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListProdutoUseCase(
    produtoRepository
);