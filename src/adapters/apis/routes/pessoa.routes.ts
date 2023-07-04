import pessoaController from "../controllers/pessoa.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";
import authMiddlewares from "../middlewares/auth.middlewares";
import pessoaMiddlewares from '../middlewares/pessoa.middlewares';

export class PessoaRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PessoaRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/pessoas`)
            .get(
                authMiddlewares.checkAuth,
                  pessoaMiddlewares.userAdmin,
                pessoaController.listPessoas)

            .post(
                pessoaController.createPessoa)

        this.app.route(`/pessoas/:idpessoa`)
            .get(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.validatePessoaExists,
                pessoaController.getPessoaById)

            .put(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                pessoaMiddlewares.validatePessoaExists,
                pessoaController.updatePessoa)

            .delete(
                authMiddlewares.checkAuth,
                pessoaMiddlewares.userAdmin,
                pessoaMiddlewares.validatePessoaExists,
                pessoaController.deletePessoa)

        return this.app;
    }
}