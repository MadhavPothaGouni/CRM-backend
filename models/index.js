const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Employee = require('./employee')(sequelize, Sequelize.DataTypes);
const Enquiry = require('./enquiry')(sequelize, Sequelize.DataTypes);


// Associations
Employee.hasMany(Enquiry, { foreignKey: 'counselorId', as: 'enquiries' });
Enquiry.belongsTo(Employee, { foreignKey: 'counselorId', as: 'counselor' });


const db = { sequelize, Sequelize, Employee, Enquiry };


module.exports = db;