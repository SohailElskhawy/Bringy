// app.js - Create Express app but DON'T start the server
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const orderRoutes = require('./routes/order.route');
const supplierRoutes = require('./routes/supplier.route');
const basketRoutes = require('./routes/basket.route');
const orderItemsRoutes = require('./routes/orderItems.route');
const chatRoutes = require('./routes/chat.route');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/orderItems', orderItemsRoutes);
app.use('/api/chat', chatRoutes);

// Export the app WITHOUT starting the server
module.exports = app;