const express = require('express');
const router = express.Router();

const {addProduct, getProductsByCategory,
    getAllProducts, sortProductsByPrice, 
    getProductsBySearchTerm, deleteProduct,
    updateProduct, restoreProduct, filterProducts} = require('../controllers/product.controller');


router.post('/products', async (req, res) => {
    try {
        await addProduct(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});


router.get('/products', async (req, res) => {
    try {
        await getAllProducts(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});

router.get('/products/category/:category_id', async (req, res) => {
    try {
        await getProductsByCategory(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});

router.get('/products/sort/:sortBy', async (req, res) => {
    try {
        await sortProductsByPrice(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});


router.get('/products/search/:searchTerm', async (req, res) => {
    try {
        await getProductsBySearchTerm(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});


router.delete('/products/:id', async (req, res) => {
    try {
        await deleteProduct(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});


router.put('/products/:id', async (req, res) => {
    try {
        await updateProduct(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }
});

// from product.controller.js
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.put('/products/restore/:id', restoreProduct);

router.get('/products/filter', async (req, res) => {
    try {
        await filterProducts(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in product.route.js" });
    }

});


module.exports = router;