module.exports = app => {
    const parcels = require("../controllers/parcel.controller.js");

    var router = require("express").Router();

    router.post("/", parcels.create);
    router.get("/", parcels.findAll);
    router.get("/:id", parcels.findOne);
    router.put("/:id", parcels.update);
    router.delete("/:id", parcels.delete);

    app.use('/api/parcels', router);
};