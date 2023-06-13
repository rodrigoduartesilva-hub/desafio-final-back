import express from 'express';
import createPedidoUsecase from '../../../domain/usecases/pedidos/create.pedido.usecase';
import readPedidoUsecase from '../../../domain/usecases/pedidos/read.pedido.usecase';
import updatePedidoUsecase from '../../../domain/usecases/pedidos/update.pedido.usecase';
import deletePedidoUsecase from '../../../domain/usecases/pedidos/delete.pedido.usecase';
import listPedidoUsecase from '../../../domain/usecases/pedidos/list.pedido.usecase';
import debug from 'debug';

const log: debug.IDebugger = debug('app:pedido-controller');

class PedidoController {
    async listPedidos(req: express.Request, res: express.Response){
        const pedidos = await listPedidoUsecase.execute();
        res.status(200).send(pedidos);
    }

    async getPedidoById(req: express.Request, res: express.Response) {
        const pedido = await readPedidoUsecase.execute({
            idpedido: Number(req.params.idpedido),
        });
        res.status(200).send(pedido);
    }

    async createPedido(req: express.Request, res: express.Response) {
        const pedido = await createPedidoUsecase.execute(req.body);
        res.status(201).send(pedido);
    }

    async updatePedido(req: express.Request, res: express.Response) {
        const pedido = await updatePedidoUsecase.execute(req.body);
        res.status(200).send(pedido);
    }

    async deletePedido(req: express.Request, res: express.Response) {
        const pedido = await deletePedidoUsecase.execute({
            idpedido: Number(req.params.idpedido)
        });
        res.status(204).send();
    }
}

export default new PedidoController();