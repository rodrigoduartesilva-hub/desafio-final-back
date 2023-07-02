import produtoController from "../controllers/produto.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";
import authMiddlewares from "../middlewares/auth.middlewares";
import pessoaMiddlewares from "../middlewares/pessoa.middlewares";

export class ProdutoRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'produtoRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/produtos`)
            .get(
                produtoController.listProdutos)
            .post(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                produtoController.createProduto)

        this.app.route(`/produtos/:idproduto`)
            .get(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                produtoController.getProdutoById)
            .put(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                produtoController.updateProduto)
            .delete(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                produtoController.deleteProduto)

        return this.app;
    }
}