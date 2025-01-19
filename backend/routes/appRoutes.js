const express = require('express');
const protect = require('../middleware/authMiddleware.js')
const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
    res.json({ message: `Welcome user ${req.user}!` })
});


router.get('/applications', protect, (req, res) => {
    res.json({ message: `Here are the applications for user ${req.user}` })
});


module.exports = router;
