const { DataTypes } = require('sequelize');

const sequelize = require('../db.js');

const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  },
);
User.sync({ force: true });

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true