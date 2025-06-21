const express = require('express');
const router = express.Router();
const { extractIngredients, findProducts,addToBasket } = require('../controllers/chat.controller');
const Product = require('../models/product.model');





// POST /chat
router.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const ingredients = await extractIngredients(message);
        const products = await findProducts(ingredients);

        res.json({ ingredients, products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error processing chat.");
    }
});

// POST /chat/add-to-basket
router.post("/chat/add-to-basket", async (req, res) => {
    const { userId, productIds } = req.body;

    try {
        const products = await Product.find({ _id: { $in: productIds } });
        await addToBasket(userId, products);
        res.send("Added to basket.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding to basket.");
    }
});


module.exports = router;