const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database successfully');

    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
        res.status(400).json({ error: 'Database connection failed' });

    }
}

module.exports = connectToDb;