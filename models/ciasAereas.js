const Sequelize = require('sequelize');
const conn = require('./database/database');

console.log("Tabela de Companias Aéreas em Criação");

const ciasAereas = conn.define(
    'ciasAereas', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nome:{
            type:Sequelize.TEXT,
            allowNull: false
        },
        Sigla:{
            type:Sequelize.TEXT,
            allowNull: false
        },
        Som:{
            type:Sequelize.TEXT,
            allowNull: false
        },
        Logo:{
            type:Sequelize.TEXT,
            allowNull: false
        },
        Ativo:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    }
);

class ciaAerea {
    constructor(id, Nome, Sigla, Som, Logo, Ativo){
        id    : id
        Nome  : Nome;
        Sigla : Sigla;
        Som   : Som;
        Logo  : Logo;
        Ativo : Ativo;
    }
}

ciasAereas
    .sync({force: false})
    .then(() => {
        console.log("Tabela de Companias Aéreas criada com sucesso!!!");
    });

module.exports = ciasAereas;