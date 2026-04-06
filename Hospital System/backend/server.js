const express = require('express');
const cors = require('cors');
require('dotenv').config();

const patientRoutes = require('./routes/patientRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', patientRoutes);

app.get('/', (req, res) => {
    res.send('Hospital Queue Management API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});