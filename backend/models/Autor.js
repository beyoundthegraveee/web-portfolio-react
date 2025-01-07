const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Autor', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Imie: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        Nazwisko: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        Biografia: {
            type: Sequelize.STRING(1000),
            allowNull: true,
        },
        Email: {
            type: Sequelize.STRING(30),
            allowNull: true,
        },
        LinkInstagram: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        LinkFiverr: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
    }, {
        tableName: 'autor',
        timestamps: false,
    });
};
