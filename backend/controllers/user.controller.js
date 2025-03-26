const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sendVerificationEmail = require('../services/sendVerificationEmail');

const register = async (req, res) => {
    try {
        // get user input
        const { name, email, password } = req.body;

        // validate user input
        if (!(email && password && name)) {
            return res.status(400).json({ message: "All input is required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // save user
        await user.save();

        // create token for email verification
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });

        // send email verification link
        await sendVerificationEmail(user.email, user.name, token);

        res.status(201).json({
            message: "User registered successfully. Please check your email for verification.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).json({ message: "Invalid token" });

        const decoded = jwt.verify(token, 'test');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
        console.log("Email verified successfully");
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};






module.exports = { register, verifyEmail };