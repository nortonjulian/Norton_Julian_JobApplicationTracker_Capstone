const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists'})
    }

    try {
        const user = new User({ username, email, password });
        await user.save()

        const token = user.generateAuthToken();
        res.status(201).json({
            message: 'user registered successfully',
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Check if password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' })
        }

        //Generate token
        const token = user.generateAuthToken();
        res.json({
            message: 'Login sucessful',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router
