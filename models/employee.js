const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
const Employee = sequelize.define(
'Employee',
{
id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
validate: { notEmpty: true },
},
email: {
type: DataTypes.STRING,
unique: true,
allowNull: false,
validate: { isEmail: true },
},
password: {
type: DataTypes.STRING,
allowNull: false,
},
},
{
tableName: 'employees',
hooks: {
async beforeCreate(employee) {
if (employee.password) {
const saltRounds = 10;
employee.password = await bcrypt.hash(employee.password, saltRounds);
}
},
async beforeUpdate(employee) {
if (employee.changed('password')) {
const saltRounds = 10;
employee.password = await bcrypt.hash(employee.password, saltRounds);
}
},
},
}
);


return Employee;
};