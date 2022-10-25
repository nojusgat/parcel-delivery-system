const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expiration
    });
};

exports.authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};