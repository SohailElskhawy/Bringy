const express = require('express');
const router = express.Router();
const { register, verifyEmail,adminLogin, login, getUser } = require('../controllers/user.controller');
const sendVerificationEmail = require('../services/sendVerificationEmail');

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


// send verification email
router.post('/send-verification-email', async (req, res) => {
    try {
        const { email, name, token } = req.body;
        await sendVerificationEmail(email, name, token);
        res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});

// get user by id
router.get('/:id', async (req, res) => {
    try {
        await getUser(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});



module.exports = router;