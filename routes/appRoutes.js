const express = require('express');
const protect = ('../middleware/authMiddleware.js')
const router = express.Router();

router.get('/dashboard', protect, (req, res) => {
    resjosn({ message: `Welcome user ${req.user}!` })
});


router.get('/applications', protect, (req, res) => {
    resjosn({ message: `Here are the applications for user ${req.user}` })
});


module.exports = router;
