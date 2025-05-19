const Basket = require('../models/basket.model');

/*
  Functions:
  - getBasket
  - removeProduct
  - increaseQuantity
  - decreaseQuantity
  - clearBasket
  - addProductToBasket
*/


const getBasket = async (req, res) => {
	try {
		const { customerId } = req.params;

		const basket = await Basket.find
			({ customerId })
			.populate("products.productId", "name price image_url");
		if (!basket) return res.status(404).json({ message: "Basket not found" });
		res.status(200).json(basket);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};




// REMOVE A PRODUCT FROM BASKET
const removeProduct = async (req, res) => {
	try {
		const { customerId, productId } = req.body;

		const basket = await Basket.findOne({ customerId });
		if (!basket) return res.status(404).json({ message: "Basket not found" });

		basket.products = basket.products.filter(
			(item) => item.productId.toString() !== productId
		);

		await basket.save();
		res.status(200).json({ message: "Product removed successfully", basket });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// INCREASE PRODUCT QUANTITY
const increaseQuantity = async (req, res) => {
	try {
		const { customerId, productId } = req.body;

		const basket = await Basket.findOne({ customerId });
		if (!basket) return res.status(404).json({ message: "Basket not found" });

		const product = basket.products.find(
			(item) => item.productId.toString() === productId
		);

		if (!product) return res.status(404).json({ message: "Product not found in basket" });

		product.quantity += 1;

		await basket.save();
		res.status(200).json({ message: "Product quantity increased", basket });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// DECREASE PRODUCT QUANTITY OR REMOVE IF 1
const decreaseQuantity = async (req, res) => {
	try {
		const { customerId, productId } = req.body;

		const basket = await Basket.findOne({ customerId });
		if (!basket) return res.status(404).json({ message: "Basket not found" });

		const product = basket.products.find(
			(item) => item.productId.toString() === productId
		);

		if (!product) return res.status(404).json({ message: "Product not found in basket" });

		if (product.quantity > 1) {
			product.quantity -= 1;
		} else {
			basket.products = basket.products.filter(
				(item) => item.productId.toString() !== productId
			);
		}

		await basket.save();
		res.status(200).json({ message: "Product quantity updated", basket });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// REMOVE ALL PRODUCTS FROM BASKET
const clearBasket = async (req, res) => {
	try {
		const { customerId } = req.body;

		const basket = await Basket.findOne({ customerId });
		if (!basket) return res.status(404).json({ message: "Basket not found" });

		basket.products = [];

		await basket.save();
		res.status(200).json({ message: "Basket cleared", basket });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// ADD A PRODUCT TO BASKET
const addProductToBasket = async (req, res) => {
	try {
		const { customerId, productId, quantity } = req.body;

		const parsedQuantity = parseInt(quantity);
		if (!customerId || !productId || isNaN(parsedQuantity) || parsedQuantity < 1) {
			return res.status(400).json({ message: "Valid Customer ID, Product ID, and Quantity are required" });
		}

		let basket = await Basket.findOne({ customerId });

		// Create basket if it doesn't exist
		if (!basket) {
			basket = new Basket({ customerId, products: [] });
		}

		const existingProduct = basket.products.find(
			(item) => item.productId.toString() === productId.toString()
		);

		if (existingProduct) {
			existingProduct.quantity += parsedQuantity;
		} else {
			basket.products.push({ productId, quantity: parsedQuantity });
		}

		await basket.save();
		res.status(200).json({ message: "Product added to basket", basket });
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
	getBasket
};
