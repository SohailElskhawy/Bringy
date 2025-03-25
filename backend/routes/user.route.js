import express from 'express';
const router = express.Router();
import { register } from '../controllers/user.controller';

router.post('/register', async (req, res) => {
    try {
        await register(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error in user.route.js" });
    }
});






export default router;