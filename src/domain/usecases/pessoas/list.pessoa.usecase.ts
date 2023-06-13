import { IUseCase } from "../usecase.interface";
import { IPessoaRepository } from "../../repositories/pessoa.repository.interface";
import { IPessoaEntity } from "../../entities/pessoas/pessoa.entity";
import pessoaRepository from "../../../adapters/repositories/pessoa.repository";

class ListPessoaUseCase implements IUseCase {

    constructor(private _repository: IPessoaRepository) {

    }

    async execute(): Promise<IPessoaEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListPessoaUseCase(
    pessoaRepository
);