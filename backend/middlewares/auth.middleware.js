const jwt = require('jsonwebtoken');
const db = require("../models");
const Users = db.users;

exports.generateToken = (user) => {
    let token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expiration
    });

    Users.update({
        token: token
    }, {
        where: {
            id: user.id
        }
    });

    return token;
};

exports.authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);

        const user = await Users.findByPk(decoded.id);
        if (!user || user.token != token)
            throw new Error();

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authorization failed."
        });
    }
};