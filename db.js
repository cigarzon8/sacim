const { Sequelize } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'mysql://sacim:DATABASE$*b123Pas456abc@localhost:3306/sacimdatabase';//''postgres://usuario:contraseña@host:5432/nombre_base';
const DATABASE_dialect = process.env.DATABASE_URL || 'mysql';//''postgres://usuario:contraseña@host:5432/nombre_base';
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: DATABASE_dialect,
  logging: false
});

module.exports = sequelize;
