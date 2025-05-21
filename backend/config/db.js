// config/db.js
const mongoose = require('mongoose');

// Connect to the real MongoDB database
const connectDB = async () => {
    try {
        // Check if we're in test mode
        if (process.env.NODE_ENV === 'test') {
            console.log('Test environment detected, skipping real DB connection');
            return;
        }
        
        // Connect to the real MongoDB database using your connection string
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;