import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('pedido_produtos', {
    idpedido_produto:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idpedido_produto'
    },
    idpedido: Sequelize.DataTypes.INTEGER,
    idproduto: Sequelize.DataTypes.INTEGER,
    quantidade: Sequelize.DataTypes.INTEGER
});