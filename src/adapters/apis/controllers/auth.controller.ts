import express from 'express'
import loginAuthUsecase from '../../../domain/usecases/auth/login.auth.usecase';





class AuthController {
    async login(req: express.Request, res: express.Response){
        const client = await loginAuthUsecase.execute(req.body);

        if(!client)
        {
            res.status(401).send({
                error: `Dados invalidos`
            });
        }

        res.status(200).send(client);
    }
}

export default new AuthController();