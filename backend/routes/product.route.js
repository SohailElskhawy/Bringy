const express = require('express');
const router = express.Router();

const {addProduct} = require('../controllers/product.controller');


router.post('/products', async (req, res) => {
    try {
        await addProduct(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});
