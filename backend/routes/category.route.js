const express = require('express');
const router = express.Router();

const {addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory} = require('../controllers/category.controller');


router.post('/categories', async (req, res) => {
    try {
        await addCategory(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in category.route.js" });
    }
}
);

router.get('/categories', async (req, res) => {
    try {
        await getAllCategories(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in category.route.js" });
    }
}
);

router.get('/categories/:id', async (req, res) => {
    try {
        await getCategoryById(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in category.route.js" });
    }
}
);

router.put('/categories/:id', async (req, res) => {
    try {
        await updateCategory(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in category.route.js" });
    }
}
);

router.delete('/categories/:id', async (req, res) => {
    try {
        await deleteCategory(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in category.route.js" });
    }
}
);

module.exports = router;
