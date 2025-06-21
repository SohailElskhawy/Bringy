const express = require('express');
const router = express.Router();

const {addSupplier,
    getAllSuppliers} = require('../controllers/supplier.controller');

router.post('/suppliers', async (req, res) => {
    try {
        await addSupplier(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in supplier.route.js" });
    }
}
);

router.get('/suppliers', async (req, res) => {
    try {
        await getAllSuppliers(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in supplier.route.js" });
    }
}
);


module.exports = router;