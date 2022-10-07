const db = require("../models");
const Users = db.users;

exports.register = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    Users.create(user)
        .then(data => {
            data.dataValues.password = undefined;
            res.send(data);
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
                    res.send(user);
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
    const id = req.query.test_id;

    Users.findByPk(id)
        .then(data => {
            if (data == null) {
                res.status(404).send({
                    message: `User with id ${id} was not found.`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};