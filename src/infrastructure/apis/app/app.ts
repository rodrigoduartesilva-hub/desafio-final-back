import express from 'express';
import * as http from 'http';



import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { debug } from 'debug';
import constants from '../../config/constants';
import apiConfig from '../../config/api.config';

import { CommonRoutesConfig } from '../../../adapters/apis/routes/common.routes';
import { CategoriaRoutes } from '../../../adapters/apis/routes/categoria.routes';
import { ProdutoRoutes } from '../../../adapters/apis/routes/produto.routes';
import { PessoaRoutes } from '../../../adapters/apis/routes/pessoa.routes';
import { PedidoRoutes } from '../../../adapters/apis/routes/pedido.routes';
import { AuthRoutes } from '../../../adapters/apis/routes/auth.routes';
// import { LoginAuthUseCase } from '../../../adapters/apis/routes/auth.routes';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
}

if(!process.env.DEBUG) {
    loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
routes.push(new CategoriaRoutes(app));
routes.push(new ProdutoRoutes(app));
routes.push(new PessoaRoutes(app));
routes.push(new PedidoRoutes(app));
routes.push(new AuthRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send({message: constants.MESSAGES.RODANDO.replace('{port}', '3000')});
})

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Rotas configuradas para ${route.getName()}`);
    });
    console.log({message: constants.MESSAGES.RODANDO});
});

export default app;