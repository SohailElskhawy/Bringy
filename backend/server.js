const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(5000, () =>{
    connectDB();
    console.log('Server running on port 5000');
});