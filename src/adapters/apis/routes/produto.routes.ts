import produtoController from "../controllers/produto.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";

export class ProdutoRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'produtoRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/produtos`)
            .get(produtoController.listprodutos)
            .post(produtoController.createproduto)

        this.app.route(`/produtos/:idproduto`)
            .get(produtoController.getProdutoById)
            .put(produtoController.updateproduto)
            .delete(produtoController.deleteproduto)

        return this.app;
    }
}