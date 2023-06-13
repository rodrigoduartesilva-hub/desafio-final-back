import { TipoUsuario } from '../../../../domain/entities/pessoas/tipousuario.entity';
import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('pessoa', {
    idpessoa:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idpessoa'
    },
    nome: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    senha: Sequelize.DataTypes.STRING,
    tipoUsuario: Sequelize.DataTypes.ENUM
});