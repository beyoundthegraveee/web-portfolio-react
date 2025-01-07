const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Kategoria', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Opis: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        Nazwa_narzedzi: {
            type: Sequelize.STRING(40),
            allowNull: true,
        },
    }, {
        tableName: 'kategoria',
        timestamps: false,
    });
};
