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
    Users.scope("withPassword").findOne({ where: { username } })
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

exports.profile = (req, res) => {
    Users.findByPk(req.user.id)
        .then(async data => {
            if (data == null) {
                res.status(404).send({
                    message: `User with id ${id} was not found.`
                });
            } else {
                const courier = await Couriers.findOne({ where: { userId: req.user.id } });
                res.send({...data.dataValues, courier });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};