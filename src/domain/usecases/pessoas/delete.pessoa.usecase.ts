import { IUseCase } from "../usecase.interface";
import { IPessoaRepository } from "../../repositories/pessoa.repository.interface";
import { IPessoaEntity } from "../../entities/pessoas/pessoa.entity";
import pessoaRepository from "../../../adapters/repositories/pessoa.repository";

class DeletePessoaUseCase implements IUseCase {

    constructor(private _repository: IPessoaRepository) {

    }

    async execute(data: { idpessoa: number}): Promise<void> {
        return await this._repository.deleteById(data.idpessoa);
    }
}

export default new DeletePessoaUseCase(
    pessoaRepository
);