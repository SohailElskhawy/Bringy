// tests/setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let mongoUri;

// Function to connect to the test database
const connectTestDB = async () => {
  // Close any existing connections first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Setup before all tests run
beforeAll(async () => {
  // Create the MongoDB Memory Server
  mongoServer = await MongoMemoryServer.create();
  mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await connectTestDB();
  
  console.log(`MongoDB Memory Server started at ${mongoUri}`);
});

// Clean up data between tests
afterEach(async () => {
  // Only clear collections if connected to the memory server
  if (mongoose.connection.readyState !== 0) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// Clean up after all tests
afterAll(async () => {
  // Close mongoose connection
  await mongoose.connection.close();
  
  // Stop the MongoDB Memory Server
  if (mongoServer) {
    await mongoServer.stop();
    console.log('MongoDB Memory Server stopped');
  }
});

// Export the URI and connection function for test files
module.exports = { mongoUri, connectTestDB };