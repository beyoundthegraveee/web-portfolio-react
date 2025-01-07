const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Projekt', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Opis: {
            type: Sequelize.STRING(300),
            allowNull: false,
        },
        Termin: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        Status_pr: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        Cena: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Autor_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'autor',
                key: 'ID',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        Kategoria_ID: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'kategoria',
                key: 'ID',  
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
    }, {
        tableName: 'projekt',
        timestamps: false,
    });
};
