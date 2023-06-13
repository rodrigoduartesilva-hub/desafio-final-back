import pedidoController from "../controllers/pedido.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";

export class PedidoRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'pedidoRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/pedidos`)
            .get(pedidoController.listPedidos)
            .post(pedidoController.createPedido)

        this.app.route(`/pedidos/:idpedido`)
            .get(pedidoController.getPedidoById)
            .put(pedidoController.updatePedido)
            .delete(pedidoController.deletePedido)

        return this.app;
    }
}