import pessoaController from "../controllers/pessoa.controller";
import { CommonRoutesConfig } from "./common.routes";
import express from "express";

export class PessoaRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PessoaRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/pessoas`)
            .get(pessoaController.listPessoas)
            .post(pessoaController.createPessoa)

        this.app.route(`/pessoas/:idpessoa`)
            .get(pessoaController.getPessoaById)
            .put(pessoaController.updatePessoa)
            .delete(pessoaController.deletePessoa)

        return this.app;
    }
}