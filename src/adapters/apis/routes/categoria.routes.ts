import categoriaController from "../controllers/categoria.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";
import authMiddlewares from "../middlewares/auth.middlewares";
import pessoaMiddlewares from "../middlewares/pessoa.middlewares";

export class CategoriaRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CategoriaRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/categorias`)
            .get(categoriaController.listCategorias)
            .post(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                categoriaController.createCategoria)

        this.app.route(`/categorias/:idcategoria`)
            .get(categoriaController.getCategoriaById)
            .put(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                categoriaController.updateCategoria)
            .delete(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                categoriaController.deleteCategoria)

        return this.app;
    }
}