import { IUseCase } from "../usecase.interface";
import { IPessoaRepository } from "../../repositories/pessoa.repository.interface";
import { IPessoaEntity } from "../../entities/pessoas/pessoa.entity";
import pessoaRepository from "../../../adapters/repositories/pessoa.repository";

class ReadPessoaUseCase implements IUseCase {

    constructor(private _repository: IPessoaRepository) {

    }

    async execute(data: { idpessoa: number}): Promise<IPessoaEntity | undefined> {
        return await this._repository.readById(data.idpessoa);
    }
}

export default new ReadPessoaUseCase(
    pessoaRepository
);