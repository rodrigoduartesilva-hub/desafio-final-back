import { TipoUsuario } from "./tipousuario.entity";

export interface IPessoaEntity {
    indexId?: number,
    nome: string,
    email: string,
    senha: string,
    tipoUsuario: TipoUsuario
}