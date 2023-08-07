const express = require("express");

const userController = require("../controller/user.controller");

const userMiddleware = require("../middlewares/user.middleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userMiddleware.validUser, userController.login);

module.exports = router;
