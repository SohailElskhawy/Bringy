const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

console.log(process.env.MONGO_URI)
const app = express();
app.use(express.json());

app.listen(5000, () =>{
    connectDB();
    console.log('Server running on port 5000');
});