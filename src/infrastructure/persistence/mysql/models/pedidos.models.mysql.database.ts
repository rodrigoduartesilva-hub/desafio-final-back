import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('pedido', {
    idpedido:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idpedido'
    },
    idpessoa: Sequelize.DataTypes.INTEGER,
    idproduto: Sequelize.DataTypes.INTEGER,
    usuario: Sequelize.DataTypes.STRING,
    valor: Sequelize.DataTypes.STRING,
});