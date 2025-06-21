const app = require('./app');
const connectDB = require('./config/db');

// Check if we're in test mode
const isTestMode = process.env.NODE_ENV === 'test';

// Only start the server and connect to real DB if NOT in test mode
if (!isTestMode) {
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        // Connect to the real MongoDB database
        connectDB();
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export for testing purposes