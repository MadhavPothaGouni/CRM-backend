const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Employee } = require('../models');


// Register new employee (counselor)
exports.register = async (req, res) => {
try {
const { name, email, password } = req.body;


if (!name || !email || !password) {
return res.status(400).json({ message: 'name, email, and password are required' });
}


const existing = await Employee.findOne({ where: { email } });
if (existing) {
return res.status(409).json({ message: 'Email already registered' });
}


const employee = await Employee.create({ name, email, password });


return res.status(201).json({
message: 'Registration successful',
employee: { id: employee.id, name: employee.name, email: employee.email },
});
} catch (err) {
return res.status(500).json({ message: 'Server error', error: err.message });
}
};


// Login and return JWT
exports.login = async (req, res) => {
try {
const { email, password } = req.body;


if (!email || !password) {
return res.status(400).json({ message: 'email and password are required' });
}


const employee = await Employee.findOne({ where: { email } });
if (!employee) {
return res.status(401).json({ message: 'Invalid credentials' });
}


const isMatch = await bcrypt.compare(password, employee.password);
if (!isMatch) {
return res.status(401).json({ message: 'Invalid credentials' });
}


const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


return res.status(200).json({
message: 'Login successful',
token,
});
} catch (err) {
return res.status(500).json({ message: 'Server error', error: err.message });
}
};