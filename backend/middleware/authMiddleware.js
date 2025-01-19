const jwt = require('jsonwebtoken')

// Middleware to check if the user is authenticated
const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    try {
        token = token.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.id;
        next()
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' })
    }
}

module.exports = protect;
