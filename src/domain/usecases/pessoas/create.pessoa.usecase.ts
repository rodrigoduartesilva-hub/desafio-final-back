import { IUseCase } from "../usecase.interface";
import { IPessoaRepository } from "../../repositories/pessoa.repository.interface";
import { IPessoaEntity } from "../../entities/pessoas/pessoa.entity";
import pessoaRepository from "../../../adapters/repositories/pessoa.repository";

class CreatePessoaUseCase implements IUseCase {

    constructor(private _repository: IPessoaRepository) {

    }

    async execute(data: IPessoaEntity): Promise<IPessoaEntity | undefined> {
        return await this._repository.create(data);
    }
}

export default new CreatePessoaUseCase(
    pessoaRepository
);