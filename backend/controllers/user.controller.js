const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
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


        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        // get user's email & password 
        const { email, password } = req.body;

        // check if password & email valid
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // comparing hashed password with user's password 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Step 6: Return login token using JWT with 201 status
        const token = jwt.sign({ id: user._id }, 'test', { expiresIn: "1h" });

        // Send response with the token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const verifyEmail = async (req, res) => {
    try {
        // get token from query params
        const { token } = req.query;

        // check if token is valid
        if (!token) return res.status(400).json({ message: "Invalid token" });

        // verify token and get user id
        const decoded = jwt.verify(token, 'test');
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.isVerified) return res.status(400).json({ message: "User already verified" });

        // update user to verified
        user.isVerified = true;


        // save user
        await user.save();

        // send success response
        res.status(200).json({ message: "Email verified successfully" });
        console.log("Email verified successfully");
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

const adminLogin = async (req, res) => {
    try {
        // get user's email & password 
        const { email, password } = req.body;

        // check if password & email valid
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // comparing hashed password with user's password 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Step 6: Return login token using JWT with 201 status
        if (user.role !== 'admin' && user.role !== 'delivery') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Create JWT payload
        const payload = {
            userId: user._id,
            role: user.role,
        };

        // Sign JWT token (you can replace 'your-secret-key' with an actual secret key)
        const token = jwt.sign(payload, 'test', { expiresIn: '1h' });

        // Send response with the token
        res.status(201).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { register, verifyEmail, adminLogin, login };