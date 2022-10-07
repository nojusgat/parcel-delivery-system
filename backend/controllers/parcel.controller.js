const { getPagination, getPagingData } = require('./shared');
const db = require("../models");
const Parcels = db.parcels;

exports.create = (req, res) => {
    Parcels.create(req.body)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while creating the Parcel."
            });
        });
};

exports.findAll = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Parcels.findAndCountAll({ limit, offset, include: ["courier"], attributes: { exclude: ['courierId'] } })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(400).send({
                message:
                    err.message || "Some error occurred while retrieving parcels."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Parcels.findByPk(id, { include: ["courier"], attributes: { exclude: ['courierId'] } })
        .then(data => {
            if (data == null) {
                res.status(404).send({
                    message: `Parcel with id ${id} was not found.`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while retrieving the Parcel."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Parcels.update(req.body, {
        where: { id },
    })
        .then(num => {
            if (num == 1) {
                Parcels.findByPk(id, { include: ["courier"], attributes: { exclude: ['courierId'] } })
                    .then(data => {
                        res.send(data);
                    });
            } else {
                res.status(404).send({
                    message: `Parcel with id ${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while updating the Parcel."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Parcels.destroy({
        where: { id }
    })
        .then(num => {
            if (num == 1) {
                res.status(204).send();
            } else {
                res.status(404).send({
                    message: `Parcel with id ${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while deleting the Parcel."
            });
        });
};