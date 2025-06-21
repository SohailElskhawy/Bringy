const express = require('express');
const router = express.Router();
const {addOrderItems,
    getOrderItemsByOrderId} = require('../controllers/orderItems.controller');


// add order items to the database
router.post('/order-items', async (req, res) => {
    try {
        await addOrderItems(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in orderItems.route.js" });
    }
})


// get order items by order id
router.get('/order-items/:orderId', async (req, res) => {
    try {
        await getOrderItemsByOrderId(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in orderItems.route.js" });
    }
})


module.exports = router;

