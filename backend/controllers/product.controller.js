const Product = require('../models/product.model');

/*
    Functions:

    - addProduct (Done)
    
    - getProductsByCategory

    - updateProduct

    - deleteProduct

    - getAllProducts

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



module.exports = {
    addProduct,
};