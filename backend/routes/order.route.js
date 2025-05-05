const express = require('express');
const router = express.Router();

const {addOrder,
    getAllOrders,
    getOrderById,
    deleteOrder,
    getCustomerOrders,
    updateOrderStatus} = require('../controllers/order.controller');


router.post('/orders', async (req, res) => {
    try {
        await addOrder(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in order.route.js" });
    }
}
);

router.get('/orders', async (req, res) => {
    try {
        await getAllOrders(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in order.route.js" });
    }
}
);

router.get('/orders/:id', async (req, res) => {
    try {
        await getOrderById(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in order.route.js" });
    }
}
);

router.put('/orders/:id', async (req, res) => {
    try {
        await updateOrderStatus(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in order.route.js" });
    }
}
);

router.delete('/orders/:id', async (req, res) => {
    try {
        await deleteOrder(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in order.route.js" });
    }
}
);


router.get('/orders/customer/:customerId', async (req, res) => {
    try {
        await getCustomerOrders(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in order.route.js" });
    }
}
);

module.exports = router;