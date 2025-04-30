
const express = require('express');
const router = express.Router();
const { sortProductsByCategory } = require('../controllers/customer.controller');

router.get('/products/category/:category_id/sort', async (req, res) => {
    try {
        await sortProductsByCategory(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in customer.route.js" });
    }
});

router.get('/products/search', async (req, res) => {
    try {
        await searchProductByName(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in customer.route.js" });
    }
});

router.get('/products/sort', async (req, res) => {
    try {
        await sortProductByPrice(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in customer.route.js" });
    }
});

router.post('/basket/add', async (req, res) => {
    try {
        await addToBasket(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in customer.route.js" });
    }
});

router.get('/products/category/:category_id/filter', async (req, res) => {
    try {
        await filterProductByCategory(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in customer.route.js" });
    }
});

module.exports = router;