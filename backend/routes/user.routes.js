module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../middlewares/auth.middleware");

    var router = require("express").Router();

    router.post("/register", users.register);
    router.post("/login", users.login);
    router.get("/logout", auth.authorization, users.logout);
    router.get("/me", auth.authorization, users.profile);

    app.use('/api/auth', router);
};