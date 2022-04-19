const Sequelize = require('sequelize');
const conn = require('./database/database');

console.log("Tabela de Aeroportos em Criação");

const aeroportos = conn.define(
    'aeroporto', {
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
        portoesEmbarque:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        portoesDesembarque:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        Ativo:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    }
);

class aeroporto {
    constructor(id, Nome, Sigla, Som, portoesEmbarque, portoesDesembarque, Ativo){
        id    : id
        Nome  : Nome;
        Sigla : Sigla;
        Som   : Som;
        portoesEmbarque  : portoesEmbarque;
        portoesDesembarque : portoesDesembarque
        Ativo : Ativo;
    }
}

aeroportos
    .sync({force: false})
    .then(() => {
        console.log("Tabela de Aeroportos criada com sucesso!!!");
    });

module.exports = aeroportos;