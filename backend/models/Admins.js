const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('Admins', {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Login: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
    Password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    Role: {
      type: Sequelize.ENUM('admin'),
      defaultValue: 'admin',
      allowNull: false,
    },
  }, {
    tableName: 'Admins',
    timestamps: false,
  });
};
