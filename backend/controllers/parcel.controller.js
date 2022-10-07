const { getPagination, getPagingData } = require('./shared');
const db = require("../models");
const Parcels = db.parcels;
const Couriers = db.couriers;

exports.create = (req, res) => {
    const parcel = {
        senderName: req.body.senderName,
        senderAddress: req.body.senderAddress,
        senderPhone: req.body.senderPhone,
        receiverName: req.body.receiverName,
        receiverAddress: req.body.receiverAddress,
        receiverPhone: req.body.receiverPhone,
        weight: req.body.weight,
        price: req.body.price,
        status: req.body.status,
        courierId: req.body.courierId
    }

    Parcels.create(parcel)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while creating the Parcel."
            });
        });
};

exports.findAll = (req, res) => {
    const { page, size } = req.query;
    if (page != null && isNaN(page) || size != null && isNaN(size)) {
        res.status(400).send({
            message: "Page and size must be numbers."
        });
        return;
    }

    const { limit, offset } = getPagination(page, size);

    Parcels.findAndCountAll({ limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            if (response.page > response.total_pages) {
                res.status(404).send({
                    message: `Page ${page} was not found.`
                });
            } else {
                res.send(response);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving parcels."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Parcels.findByPk(id, {
        include: [
            {
                model: Couriers,
                as: "courier",
                include: ["car", "user"],
                attributes: {
                    exclude: ['carId', 'userId']
                }
            }
        ],
        attributes: {
            exclude: ['courierId']
        }
    })
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
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Parcel."
            });
        });
};

exports.update = async (req, res) => {
    const id = req.params.id;

    const parcelExists = await Parcels.count({ where: { id } }) > 0;
    if (!parcelExists) {
        res.status(404).send({
            message: `Parcel with id ${id} was not found.`
        });
        return;
    }

    if ("id" in req.body) {
        res.status(400).send({
            message: "Id cannot be changed."
        });
        return;
    }

    if ("courierId" in req.body) {
        const courierExists = await Couriers.count({ where: { id: req.body.courierId } }) > 0;;
        if (!courierExists) {
            res.status(400).send({
                message: `Courier with id ${req.body.courierId} was not found.`
            });
            return;
        }
    }

    Parcels.update(req.body, {
        where: { id },
    })
        .then(num => {
            if (num == 1) {
                Parcels.findByPk(id, {
                    include: [
                        {
                            model: Couriers,
                            as: "courier",
                            include: ["car", "user"],
                            attributes: {
                                exclude: ['carId', 'userId']
                            }
                        }
                    ],
                    attributes: {
                        exclude: ['courierId']
                    }
                })
                    .then(data => {
                        res.send(data);
                    });
            } else {
                res.status(400).send({
                    message: `Failed to update Parcel with id ${id}.`
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
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the Parcel."
            });
        });
};