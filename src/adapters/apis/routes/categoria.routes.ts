import categoriaController from "../controllers/categoria.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";

export class CategoriaRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CategoriaRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/categorias`)
            .get(categoriaController.listCategorias)
            .post(categoriaController.createCategoria)

        this.app.route(`/categorias/:idcategoria`)
            .get(categoriaController.getCategoriaById)
            .put(categoriaController.updateCategoria)
            .delete(categoriaController.deleteCategoria)

        return this.app;
    }
}