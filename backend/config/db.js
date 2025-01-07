require('dotenv').config({path: './config/.env'});
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

const Klients = require('../models/Klients.js')(sequelize);
const Autor = require('../models/Autor.js')(sequelize);
const Kategoria = require('../models/Kategoria.js')(sequelize);
const Project = require('../models/Project.js')(sequelize);
const Recenzja = require('../models/Recenzja.js')(sequelize);

Recenzja.belongsTo(Klients, { foreignKey: 'Klients_ID' });
Recenzja.belongsTo(Project, { foreignKey: 'Projekt_ID' });
Klients.hasMany(Recenzja, { foreignKey: 'Klients_ID' });
Project.hasMany(Recenzja, { foreignKey: 'Projekt_ID' });

module.exports = {
    sequelize: sequelize,
    klients: Klients,
    autor: Autor,
    kategoria: Kategoria,
    projekt: Project,
    recenzja: Recenzja
};