const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Recenzja', {
        Projekt_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'projekt',
                key: 'ID',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        Klients_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'klients',
                key: 'ID',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        Ocena_wymagan: {
            type: Sequelize.FLOAT(3, 2),
            allowNull: false,
        },
        Ocena_czasu: {
            type: Sequelize.FLOAT(3, 2),
            allowNull: false,
        },
        Wrazenie: {
            type: Sequelize.STRING(500),
            allowNull: true,
        },
    }, {
        tableName: 'recenzja',
        timestamps: false,
        primaryKey: false,
        indexes: [
            {
                unique: true,
                fields: ['Projekt_ID', 'Klients_ID'],
            }
        ],
    });
};
