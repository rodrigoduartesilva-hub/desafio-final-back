import  express  from "express";
import  jwt  from "jsonwebtoken";
import { IPessoaRepository } from "../../../domain/repositories/pessoa.repository.interface";


class AuthMiddleware {
   

    async checkAuth(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const token = req.header('Authorization')?.replace('Bearer ' , '');

            

            if(!token){
                res.status(401).send({
                    error: 'Please authenticate'
                });
            } else {
                const decoded = jwt.verify(token, String(process.env.SECRET_KEY));
                console.log(decoded);
                next()
            }


        } catch (error) {
            res.status(401).send({
                error: 'Please authenticate'
            })


        }
    }


}

export default new AuthMiddleware()