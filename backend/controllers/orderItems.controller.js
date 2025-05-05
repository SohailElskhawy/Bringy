const OrderItems = require('../models/orderItems.model');


/*

    functions:

    addOrderItems: function to add order items to the database

    getOrderItemsByOrderId: function to get order items by order id

*/


// add order items to the database
const addOrderItems = async (req, res) => {
    try {
        const orderItems = new OrderItems(req.body);
        await orderItems.save();
        res.status(201).json(orderItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get order items by order id
const getOrderItemsByOrderId = async (req, res) => {
    try {
        const orderItems = await OrderItems.find({ orderId: req.params.orderId }).populate('products.productId');
        if (!orderItems) {
            return res.status(404).json({ message: 'Order items not found' });
        }
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// export functions
module.exports = {
    addOrderItems,
    getOrderItemsByOrderId
};