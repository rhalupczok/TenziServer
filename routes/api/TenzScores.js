const express = require("express");
const router = express.Router();
const TenziScoresController = require("../../controllers/TenziScoresController");

router
    .route("/")
    .get(TenziScoresController.getScores)
    .post(TenziScoresController.updateUserScore);

router
    .route("/:userName")
    .get(TenziScoresController.getUserScores)
    .delete(TenziScoresController.deleteUserScores);

module.exports = router;
