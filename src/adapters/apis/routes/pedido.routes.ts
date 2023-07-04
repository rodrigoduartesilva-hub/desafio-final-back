import pedidoController from "../controllers/pedido.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";
import authMiddlewares from "../middlewares/auth.middlewares";

export class PedidoRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'pedidoRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/pedidos`)
            .get(
                authMiddlewares.checkAuth,
                pedidoController.listPedidos)
            .post(
                authMiddlewares.checkAuth,
                pedidoController.createPedido)

        this.app.route(`/pedidos/:idpedido`)
            .get(
                authMiddlewares.checkAuth,
                pedidoController.getPedidoById)
            .put(
                authMiddlewares.checkAuth,
                pedidoController.updatePedido)
            .delete( 
                authMiddlewares.checkAuth,
                pedidoController.deletePedido)

        return this.app;
    }
}