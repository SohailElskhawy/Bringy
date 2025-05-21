const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const orderRoutes = require('./routes/order.route');
const supplierRoutes = require('./routes/supplier.route');
const basketRoutes = require('./routes/basket.route');
const orderItemsRoutes = require('./routes/orderItems.route');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/orderItems', orderItemsRoutes);





app.listen(5000, () => {
    connectDB();
    console.log('Server running on port 5000');
});