const { getPagination, getPagingData } = require('./shared');
const db = require("../models");
const Cars = db.cars;

exports.create = (req, res) => {
    Cars.create(req.body)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while creating the Car."
            });
        });
};

exports.findAll = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Cars.findAndCountAll({ limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving cars."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Cars.findByPk(id)
        .then(data => {
            if (data == null) {
                res.status(404).send({
                    message: `Car with id ${id} was not found.`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving the Car."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Cars.update(req.body, {
        where: { id }
    })
        .then(num => {
            Cars.findByPk(id)
                .then(data => {
                    if (data == null) {
                        res.status(404).send({
                            message: `Car with id ${id} was not found.`
                        });
                    } else {
                        res.send(data);
                    }
                });
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while updating the Car."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Cars.destroy({
        where: { id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send();
            } else {
                res.status(404).send({
                    message: `Car with id ${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while deleting the Car."
            });
        });
};