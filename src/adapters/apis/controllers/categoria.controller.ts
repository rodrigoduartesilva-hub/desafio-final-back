import express from 'express';
import createCategoriaUsecase from '../../../domain/usecases/categorias/create.categoria.usecase';
import readCategoriaUsecase from '../../../domain/usecases/categorias/read.categoria.usecase';
import updateCategoriaUsecase from '../../../domain/usecases/categorias/update.categoria.usecase';
import deleteCategoriaUsecase from '../../../domain/usecases/categorias/delete.categoria.usecase';
import listCategoriaUsecase from '../../../domain/usecases/categorias/list.categoria.usecase';
import debug from 'debug';

const log: debug.IDebugger = debug('app:categoria-controller');

class CategoriaController {
    async listCategorias(req: express.Request, res: express.Response){
        const categorias = await listCategoriaUsecase.execute();
        res.status(200).send(categorias);
    }

    async getCategoriaById(req: express.Request, res: express.Response) {
        const categoria = await readCategoriaUsecase.execute({
            idcategoria: Number(req.params.idcategoria),
        });
        res.status(200).send(categoria);
    }

    async createCategoria(req: express.Request, res: express.Response) {
        const categoria = await createCategoriaUsecase.execute(req.body);
        res.status(201).send(categoria);
    }

    async updateCategoria(req: express.Request, res: express.Response) {
        const categoria = await updateCategoriaUsecase.execute(req.body);
        res.status(200).send(categoria);
    }

    async deleteCategoria(req: express.Request, res: express.Response) {
        const Categoria = await deleteCategoriaUsecase.execute({
            idcategoria: Number(req.params.idcategoria)
        });
        res.status(204).send();
    }
}

export default new CategoriaController();