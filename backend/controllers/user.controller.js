import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import sendVerificationEmail from "../services/sendVerificationEmail";


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





export { register };