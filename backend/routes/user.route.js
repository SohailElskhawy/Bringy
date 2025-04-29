const express = require('express');
const router = express.Router();
const { register, verifyEmail,adminLogin, login } = require('../controllers/user.controller');

router.post('/register', async (req, res) => {
    try {
        await register(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});

router.get('/verify-email', async (req, res) => {
    try {
        await verifyEmail(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        await adminLogin(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});



router.post('/login', async (req, res) => {
    try {
        await login(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});




module.exports = router;