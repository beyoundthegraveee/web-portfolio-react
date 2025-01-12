const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('Comments', {
        ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Project_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'projekt',
                key: 'ID',
            },
        },
        Content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        Date_Added: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    }, {
        tableName: 'comments',
        timestamps: false,
    });
};
