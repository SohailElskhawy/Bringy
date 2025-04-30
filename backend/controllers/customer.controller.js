/* 

Functions : 

    -sortProductsByCategory (Done)
    -searchProductByName    (Done)
    -sortProductByPrice     (Done)
    -addToBasket            (Done)
    -filterProductByCategory (Done)

    

    */

const Product = require('../models/product.model');

// sort products by category
const sortProductsByCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const { sortBy = 'price', order = 'asc' } = req.query;


        const products = await Product.find({ category_id, is_deleted: false })
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 }) // Sort dynamically based on query
            .populate('category_id') // Populate category details if needed
            .populate('supplier_id'); // Populate supplier details if needed

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// search product by name
const searchProductByName = async (req, res) => {
    try {
        const { name } = req.query; // Get the product name from query parameters

        if (!name) {
            return res.status(400).json({ message: "Product name is required" });
        }

        // Search for products with names matching the query (case-insensitive)
        const products = await Product.find({
            name: { $regex: name, $options: 'i' },
            is_deleted: false
        }).populate('category_id').populate('supplier_id');

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found with the given name" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// sort products by price
const sortProductByPrice = async (req, res) => {
    try {
        const { order = 'asc' } = req.query; // Get the sort order from query parameters (default: ascending)

        const products = await Product.find({ is_deleted: false })
            .sort({ price: order === 'asc' ? 1 : -1 }) // Sort dynamically based on the order
            .populate('category_id') // Populate category details if needed
            .populate('supplier_id'); // Populate supplier details if needed

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// add product to basket
const addToBasket = async (req, res) => {
    try {
        const { customerId, productId } = req.body; // Get customer ID and product ID from the request body

        if (!customerId || !productId) {
            return res.status(400).json({ message: "Customer ID and Product ID are required" });
        }

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const product = await Product.findById(productId);
        if (!product || product.is_deleted) {
            return res.status(404).json({ message: "Product not found or has been deleted" });
        }

        // Add the product to the customer's basket
        customer.basket = customer.basket || [];
        customer.basket.push(productId);

        await customer.save();

        res.status(200).json({ message: "Product added to basket successfully", basket: customer.basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// filter products by category
const filterProductByCategory = async (req, res) => {
    try {
        const { category_id } = req.params; // Get category ID from request parameters

        const products = await Product.find({ category_id, is_deleted: false })
            .populate('category_id') // Populate category details if needed
            .populate('supplier_id'); // Populate supplier details if needed

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = 
    { sortProductsByCategory, 
    searchProductByName,
     sortProductByPrice, 
     addToBasket,
      filterProductByCategory };



