const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    try {
        console.log("Received data:", { username, email, password })
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login route
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await user.matchPassword(password); // Assuming you have this method on your User model
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = user.generateAuthToken();
        res.json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
