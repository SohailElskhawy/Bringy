const Order = require('../models/order.model');


/*
    Functions:

    - addOrder (Done)
    
    - getAllOrders (Done)
    
    - getOrderById (Done)

    - updateOrderStatus (Done)
    
    - deleteOrder (Done)

    - getCustomerOrders (Done)

*/

// add new order
const addOrder = async (req, res) => {
    try {
        const { customerId, is_delivered, paymentMethod, totalPrice, address } = req.body;
        const order = new Order({
            customerId,
            is_delivered,
            paymentMethod,
            totalPrice,
            address
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// get order by id
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// update order
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_delivered } = req.body;
        const order = await Order
            .findByIdAndUpdate(id, { is_delivered }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


// delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// get customer orders
const getCustomerOrders = async (req, res) => {
    try {
        const { customerId } = req.params;
        const orders = await Order.find({
            customerId
        });
        if (!orders) {
            return res.status(404).json({ message: "No orders found for this customer" });
        }
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


// export functions
module.exports = {
    addOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getCustomerOrders
}