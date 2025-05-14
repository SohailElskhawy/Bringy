const Basket = require('../models/basket.model');

/* 
    -removeProduct (DONE)

    -increaseQuantity (DONE)

    -decreaseQuantity    (DONE)

    -removeAllProducts   (DONE)

    -addProductToBasket (DONE)

    */
const removeProduct = async (req, res) => {
    try {
        const { basketId, productId } = req.body;

        const basket = await Basket.findOne({ basketId });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        basket.productList = basket.productList.filter(
            (item) => item.productId.toString() !== productId
        );

        await basket.save();
        res.status(200).json({ message: "Product removed successfully", basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const increaseQuantity = async (req, res) => {
    try {
        const { basketId, productId } = req.body;

        const basket = await Basket.findOne({ basketId });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        const product = basket.productList.find(
            (item) => item.productId.toString() === productId
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found in basket" });
        }

        product.quantity += 1;

        await basket.save();
        res.status(200).json({ message: "Product quantity increased", basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const decreaseQuantity = async (req, res) => {
    try {
        const { basketId, productId } = req.body;

        const basket = await Basket.findOne({ basketId });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        const product = basket.productList.find(
            (item) => item.productId.toString() === productId
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found in basket" });
        }

        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            basket.productList = basket.productList.filter(
                (item) => item.productId.toString() !== productId
            );
        }

        await basket.save();
        res.status(200).json({ message: "Product quantity decreased", basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const clearBasket = async (req, res) => {
    try {
        const { basketId } = req.body;

        const basket = await Basket.findOne({ basketId });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        basket.productList = [];

        await basket.save();
        res.status(200).json({ message: "All products removed from basket", basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const addProductToBasket = async (req, res) => {
    try {
        const { basketId, productId, quantity } = req.body;

        if (!basketId || !productId || !quantity) {
            return res.status(400).json({ message: "Basket ID, Product ID, and Quantity are required" });
        }

        const basket = await Basket.findOne({ basketId });
        if (!basket) {
            return res.status(404).json({ message: "Basket not found" });
        }

        const existingProduct = basket.productList.find(
            (item) => item.productId.toString() === productId
        );

        if (existingProduct) {
            // If the product already exists in the basket, increase its quantity
            existingProduct.quantity += quantity;
        } else {
            // If the product does not exist
            basket.productList.push({ productId, quantity });
        }

        await basket.save();
        res.status(200).json({ message: "Product added to basket successfully", basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
    addProductToBasket,
};

