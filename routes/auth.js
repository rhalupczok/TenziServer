const express = require("express");
const router = express.Router();
const authController = require("../controllers/TenziUserAuthController");

router.post("/", authController.handleLogin);

module.exports = router;
