import express from 'express';
import createPessoaUsecase from '../../../domain/usecases/pessoas/create.pessoa.usecase';
import readPessoaUsecase from '../../../domain/usecases/pessoas/read.pessoa.usecase';
import updatePessoaUsecase from '../../../domain/usecases/pessoas/update.pessoa.usecase';
import deletePessoaUsecase from '../../../domain/usecases/pessoas/delete.pessoa.usecase';
import listPessoaUsecase from '../../../domain/usecases/pessoas/list.pessoa.usecase';
import debug from 'debug';

const log: debug.IDebugger = debug('app:pessoa-controller');

class PessoaController {
    async listPessoas(req: express.Request, res: express.Response){
        const pessoas = await listPessoaUsecase.execute();
        res.status(200).send(pessoas);
    }

    async getPessoaById(req: express.Request, res: express.Response) {
        const pessoa = await readPessoaUsecase.execute({
            idpessoa: Number(req.params.idpessoa),
        });
        res.status(200).send(pessoa);
    }

    async createPessoa(req: express.Request, res: express.Response) {
        const pessoa = await createPessoaUsecase.execute(req.body);
        res.status(201).send(pessoa);
    }

    async updatePessoa(req: express.Request, res: express.Response) {
        const pessoa = await updatePessoaUsecase.execute(req.body);
        res.status(200).send(pessoa);
    }

    async deletePessoa(req: express.Request, res: express.Response) {
        const pessoa = await deletePessoaUsecase.execute({
            idpessoa: Number(req.params.idpessoa)
        });
        res.status(204).send();
    }
}

export default new PessoaController();