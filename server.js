const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const { sequelize } = require('./models');
const employeeRoutes = require('./routes/employeeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


// Body parser
app.use(express.json());


// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/enquiries', enquiryRoutes);


// Health route
app.get('/', (req, res) => {
res.status(200).send('CRM API is running.');
});


// Initialize DB and start server
(async () => {
try {
await sequelize.authenticate();
// In dev you can use { alter: true } to auto-migrate model changes
await sequelize.sync();
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
} catch (err) {
console.error('Failed to start server:', err.message);
process.exit(1);
}
})();