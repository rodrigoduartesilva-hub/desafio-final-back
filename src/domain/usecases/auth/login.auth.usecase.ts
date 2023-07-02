import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import pessoaRepository from '../../../adapters/repositories/pessoa.repository';
import { IPessoaEntity } from '../../entities/pessoas/pessoa.entity';
import { IPessoaRepository } from '../../repositories/pessoa.repository.interface';
import { IUseCase } from '../usecase.interface';

class LoginAuthUseCase implements IUseCase {
  constructor(private _repository: IPessoaRepository) {}

  async execute(data: { email: string; senha: string; tipoUsuario: string }): Promise<{ pessoa: IPessoaEntity; token: string } | any> {
    let pessoa;
    try {
      pessoa = await this._repository.readByUserPass(data.email, data.senha);
    } catch (error) {
      console.error(error);
      return;
    }

    if (pessoa) {
      const userDados = {
        nome: pessoa.nome,
        idpessoa: pessoa.idpessoa,
        email: pessoa.email,
        tipoUsuario: pessoa.tipoUsuario
      };

      const token = jwt.sign(userDados, String(process.env.SECRET_KEY), {
        expiresIn: '2 days'
      });

      return {
        pessoa: userDados,
        token: token
      };
    }

    return;
  }

  async getUserFromToken(token: string): Promise<IPessoaEntity | undefined> {
    try {
      const decodedToken = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload;
      const { idpessoa } = decodedToken;

      const user = await this._repository.readById(idpessoa);
      return user;
    } catch (error) {
      console.error('Erro ao obter informações do usuário a partir do token:', error);
      return undefined;
    }
  }
}

export default new LoginAuthUseCase(pessoaRepository);
