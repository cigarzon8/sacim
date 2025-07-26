const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sacimdatabase3', 'sacim', 'DATABASE$*b123Pas456abc', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;