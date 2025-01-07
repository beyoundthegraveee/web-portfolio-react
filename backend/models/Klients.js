const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Klient', {
        id: {
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
        Kontakt: {
            type: Sequelize.STRING(40),
            allowNull: false,
        },
    }, {
        tableName: 'klients',
        timestamps: false,
    });
};