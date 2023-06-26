import express from 'express';
import createProdutoUsecase from '../../../domain/usecases/produtos/create.produto.usecase';
import readProdutoUsecase from '../../../domain/usecases/produtos/read.produto.usecase';
import updateProdutoUsecase from '../../../domain/usecases/produtos/update.produto.usecase';
import deleteProdutoUsecase from '../../../domain/usecases/produtos/delete.produto.usecase';
import listProdutoUsecase from '../../../domain/usecases/produtos/list.produto.usecase';
import debug from 'debug';

const log: debug.IDebugger = debug('app:produto-controller');

class ProdutoController {
    async listProdutos(req: express.Request, res: express.Response){
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;

        const produtos = await listProdutoUsecase.execute(limit, offset);
        res.status(200).send(produtos);
    }

    async getProdutoById(req: express.Request, res: express.Response) {
        const produto = await readProdutoUsecase.execute({
            idproduto: Number(req.params.idproduto),
        });
        res.status(200).send(produto);
    }

    async createProduto(req: express.Request, res: express.Response) {
        const produto = await createProdutoUsecase.execute(req.body);
        res.status(201).send(produto);
    }

    async updateProduto(req: express.Request, res: express.Response) {
        const produto = await updateProdutoUsecase.execute(req.body);
        res.status(200).send(produto);
    }

    async deleteProduto(req: express.Request, res: express.Response) {
        const produto = await deleteProdutoUsecase.execute({
            idproduto: Number(req.params.idproduto)
        });
        res.status(204).send();
    }
}

export default new ProdutoController();