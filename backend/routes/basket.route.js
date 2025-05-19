const express = require('express');
const router = express.Router();
const {
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
    addProductToBasket,
    getBasket
} = require('../controllers/basket.controller');


router.post('/basket/add-product', async (req, res) => {
    try {
        await addProductToBasket(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in basket.route.js" });
    }
});

router.post('/basket/remove-product', async (req, res) => {
    try {
        await removeProduct(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in basket.route.js" });
    }
});

router.post('/basket/increase-quantity', async (req, res) => {
    try {
        await increaseQuantity(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in basket.route.js" });
    }
});

router.post('/basket/decrease-quantity', async (req, res) => {
    try {
        await decreaseQuantity(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in basket.route.js" });
    }
});

router.post('/basket/clear', async (req, res) => {
    try {
        await clearBasket(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in basket.route.js" });
    }
});

router.get('/basket/:customerId', async (req, res) => {
    try {
        await getBasket(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in basket.route.js" });
    }
});

module.exports = router;