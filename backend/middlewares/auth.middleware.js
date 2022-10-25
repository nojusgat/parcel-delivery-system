const jwt = require('jsonwebtoken');
const db = require("../models");
const Users = db.users;

exports.generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expiration
    });
};

exports.authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);

        const user = await Users.findByPk(decoded.id);
        if (!user)
            throw new Error();

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authorization failed."
        });
    }
};