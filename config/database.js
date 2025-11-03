const { Sequelize } = require('sequelize');
require('dotenv').config();


const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';
const DB_STORAGE = process.env.DB_STORAGE || './crm_db.sqlite';


const sequelize = new Sequelize({
dialect: DB_DIALECT,
storage: DB_STORAGE,
logging: process.env.NODE_ENV === 'development' ? console.log : false,
});


module.exports = sequelize;