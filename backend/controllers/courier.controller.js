const { getPagination, getPagingData } = require('./shared');
const db = require("../models");
const Couriers = db.couriers;

exports.create = (req, res) => {
    Couriers.create(req.body)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while creating the Courier."
            });
        });
};

exports.findAll = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Couriers.findAndCountAll({ limit, offset, include: ["car", "user"], attributes: { exclude: ['carId', 'userId'] } })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving couriers."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Couriers.findByPk(id, { include: ["car", "user"], attributes: { exclude: ['carId', 'userId'] } })
        .then(data => {
            if (data == null) {
                res.status(404).send({
                    message: `Courier with id ${id} was not found.`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving the Courier."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Couriers.update(req.body, {
        where: { id }
    })
        .then(num => {
            if (num == 1) {
                Couriers.findByPk(id, { include: ["car", "user"], attributes: { exclude: ['carId', 'userId'] } })
                    .then(data => {
                        res.send(data);
                    });
            } else {
                res.status(404).send({
                    message: `Courier with id ${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while updating the Courier."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Couriers.destroy({
        where: { id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send();
            } else {
                res.status(404).send({
                    message: `Courier with id ${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while deleting the Courier."
            });
        });
};