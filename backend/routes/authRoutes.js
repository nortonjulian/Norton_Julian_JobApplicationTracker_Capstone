const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();
// const { loginUser, registerUser } = require('../controllers/authController')

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (err) {
        console.error('Error during registration:', err); // Log the full error
        res.status(500).json({ message: 'Server error' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required '})
        }
        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Check if correct password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' })
        }

        //Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h'})

        res.json({
            message: 'Login sucessful',
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = router
