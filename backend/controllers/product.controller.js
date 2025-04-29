const Product = require('../models/product.model');

/*
    Functions:

    - addProduct (Done)
    
    - getAllProducts (Done)
    
    - getProductsByCategory (Done)

    - sortProductsByPrice

    getProductsBySearchTerm
    
    - updateProduct
    
    - deleteProduct

*/


// add new product
const addProduct = async (req, res) => {
    try {
        const { name, price, image_url, category_id, supplier_id } = req.body;
        const product = new Product({
            name,
            price,
            image_url,
            category_id,
            supplier_id
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category_id').populate('supplier_id');
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


// get all products by category id
const getProductsByCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const products = await Product.find
            ({ category_id }).populate('category_id').populate('supplier_id');
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// sort products by price
const sortProductsByPrice = async (req, res) => {
    try {
        const { order } = req.params; // 'asc' or 'desc'
        const products = await Product.find().sort({ price: order === 'asc' ? 1 : -1 }).populate('category_id').populate('supplier_id');
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

// get products by search term
const getProductsBySearchTerm = async (req, res) => {
    try {
        const { searchTerm } = req.params;
        const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } }).populate('category_id').populate('supplier_id');
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}





module.exports = {
    addProduct,
    getProductsByCategory,
    getAllProducts,
    sortProductsByPrice,
    getProductsBySearchTerm
    // updateProduct,
    // deleteProduct
    
};