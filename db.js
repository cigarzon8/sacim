const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.RENDER_DB_URL) {
  // 🔹 Render: PostgreSQL
  sequelize = new Sequelize(process.env.RENDER_DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
  console.log('🔗 Usando base de datos PostgreSQL (Render)');
} else {
  // 🔹 Local o externa: MySQL
  sequelize = new Sequelize('sacimdatabase', 'sacim', 'DATABASE$*b123Pas456abc', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  });
  console.log('🔗 Usando base de datos MySQL (local)');
}

module.exports = sequelize;
