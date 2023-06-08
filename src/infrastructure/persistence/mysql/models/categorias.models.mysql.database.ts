import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('categoria', {
    idcategoria:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idcategoria'
    },
    nome: Sequelize.DataTypes.STRING,
});