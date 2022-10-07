module.exports = app => {
    const couriers = require("../controllers/courier.controller.js");

    var router = require("express").Router();

    router.post("/", couriers.create);
    router.get("/", couriers.findAll);
    router.get("/:id", couriers.findOne);
    router.put("/:id", couriers.update);
    router.delete("/:id", couriers.delete);

    app.use('/api/couriers', router);
};