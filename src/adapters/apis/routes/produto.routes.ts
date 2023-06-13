import produtoController from "../controllers/produto.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";

export class ProdutoRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'produtoRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/produtos`)
            .get(produtoController.listProdutos)
            .post(produtoController.createProduto)

        this.app.route(`/produtos/:idproduto`)
            .get(produtoController.getProdutoById)
            .put(produtoController.updateProduto)
            // .delete(produtoController.deleteProduto)

        return this.app;
    }
}