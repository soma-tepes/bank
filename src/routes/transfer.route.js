const transfersController = require("../controller/transfer.controller");
const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(authMiddleware.protect);
router.post("/", transfersController.transfer);

module.exports = router;
