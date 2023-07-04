import express from 'express';
import logger from '../../../infrastructure/logs/winston.log';
import readPessoaUsecase from '../../../domain/usecases/pessoas/read.pessoa.usecase';
import debug from 'debug';
import { error } from 'winston';
const log: debug.IDebugger = debug('app:pessoa-middleware');

import loginAuthUsecase from '../../../domain/usecases/auth/login.auth.usecase';
import { TipoUsuario } from '../../../domain/entities/pessoas/tipousuario.entity';
import { IPessoaEntity } from '../../../domain/entities/pessoas/pessoa.entity';

class PessoaMiddleware {
  async validatePessoaExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const pessoa = await readPessoaUsecase.execute({
        idpessoa: Number(req.params.idpessoa)
      });

      if (pessoa) {
        logger.info(['Validação de cliente: ', pessoa]);
        next();
      } else {
        logger.error(`Usuário ${req.params.idpessoa} não existe`);
        res.status(404).send('Usuário não existe');
      }

      console.log(pessoa);
    } catch (error) {
      res.status(404).send(error);
    }
  }

  async userAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Obtenha o token de acesso do cabeçalho da solicitação
      if (!token) {
        return res.status(403).json({ message: 'Token de acesso não fornecido.' });
      }

      const user = await loginAuthUsecase.getUserFromToken(token); // Função para obter o usuário a partir do token 

      if (user && user.tipoUsuario === TipoUsuario.Admin) {
        // O usuário é um administrador, passa para a próxima função de middleware
        next();
      } else {
        // O usuário não é um administrador, retorna uma resposta de acesso negado
        return res.status(403).json({ message: 'Acesso negado.' });
      }
    } catch (error) {
      console.error('Erro ao verificar usuário administrador:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}

export default new PessoaMiddleware();
