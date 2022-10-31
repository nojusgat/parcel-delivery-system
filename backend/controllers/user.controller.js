const db = require("../models");
const auth = require("../middlewares/auth.middleware");
const Users = db.users;
const Couriers = db.couriers;

exports.register = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    Users.create(user)
        .then(user => {
            user.dataValues.password = undefined;
            user.dataValues.iat = undefined;
            const token = auth.generateToken(user);
            res.status(201).send({ user, token });
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    Users.scope("withPassword").findOne({ where: { username }, attributes: { exclude: ['iat'] } })
        .then(user => {
            if (user == null) {
                res.status(400).send({
                    message: `Failed to login.`
                });
            } else {
                if (user.validPassword(password)) {
                    user.dataValues.password = undefined;
                    const token = auth.generateToken(user);
                    res.status(201).send({ user, token });
                } else {
                    res.status(400).send({
                        message: "Failed to login."
                    });
                }
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.logout = (req, res) => {
    Users.update({ iat: null }, { where: { id: req.user.id } }).then(() => {
        res.send({
            message: "User logged out successfully."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while logging out."
        });
    });
};

exports.profile = async (req, res) => {
    const courier = await Couriers.findOne({ where: { userId: req.user.id } });
    res.send({ ...req.user.dataValues, courier });
};