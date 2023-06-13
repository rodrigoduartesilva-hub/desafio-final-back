import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('produto', {
    idproduto:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idproduto'
    },
    nome: Sequelize.DataTypes.STRING,
});