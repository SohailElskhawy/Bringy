const Product = require('../models/product.model');

/*
    Functions:

    - addProduct (Done)
    
    - getAllProducts (Done)
    
    - getProductsByCategory (Done)

    - sortProductsByPrice   (Done)

    getProductsBySearchTerm (Done)
    
    - updateProduct (Done)
    
    - deleteProduct    (Done)

    - restoreProduct (Done)

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




// update product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from the request parameters
        const updates = req.body; // Updated fields from the request body

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true }).populate('category_id').populate('supplier_id');

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// deleteProduct    // delete product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from the request parameters

        const deletedProduct = await Product.findByIdAndUpdate(id, { is_deleted: true }, { new: true });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// restoreProduct // restore product by ID

const restoreProduct = async (req, res) => {
    try {
        const { id } = req.params; // Product ID from the request parameters

        const restoredProduct = await Product.findByIdAndUpdate(id, { is_deleted: false }, { new: true });

        if (!restoredProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product restored successfully", product: restoredProduct });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = {
    addProduct,
    getProductsByCategory,
    getAllProducts,
    sortProductsByPrice,
    getProductsBySearchTerm,
    updateProduct,
    deleteProduct,
    restoreProduct
};