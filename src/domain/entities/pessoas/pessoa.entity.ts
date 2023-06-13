import { TipoUsuario } from "./tipousuario.entity";

export interface IPessoaEntity {
    idpessoa: number,
    nome: string,
    email: string,
    senha: string,
    tipoUsuario: TipoUsuario
}