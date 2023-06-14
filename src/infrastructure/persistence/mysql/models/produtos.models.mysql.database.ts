import { MysqlDatabase } from '../mysql.database';
import * as Sequelize from 'sequelize';

export default MysqlDatabase.getInstance().createModel('produto', {
    idproduto:  {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'idproduto'
    },
    idcategoria: Sequelize.DataTypes.INTEGER,
    nome: Sequelize.DataTypes.STRING,
    foto: Sequelize.DataTypes.STRING,
    preco: Sequelize.DataTypes.NUMBER,
    descricao: Sequelize.DataTypes.STRING,
    categoria: Sequelize.DataTypes.STRING,
    estoque: Sequelize.DataTypes.NUMBER
});