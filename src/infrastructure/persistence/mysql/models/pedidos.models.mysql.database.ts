import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('pedido', {
    idpedido:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idpedido'
    },
    usuario: Sequelize.DataTypes.STRING,
    // listaProdutos: Sequelize.DataTypes.,
    valor: Sequelize.DataTypes.STRING,
});