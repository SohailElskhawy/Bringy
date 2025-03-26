const express = require('express');
const router = express.Router();
const { register } = require('../controllers/user.controller');

router.post('/register', async (req, res) => {
    try {
        await register(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});






module.exports = router;