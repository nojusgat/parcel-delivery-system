module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/register", users.register);
    router.post("/login", users.login);
    router.get("/", users.profile);

    app.use('/api/auth', router);
};