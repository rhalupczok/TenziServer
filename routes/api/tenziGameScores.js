const express = require("express");
const router = express.Router();
const TenziScoresController = require("../../controllers/tenziGameScoresController");

router
    .route("/")
    .get(TenziScoresController.getScores)
    .post(TenziScoresController.updateUserScore);

router
    .route("/:userName")
    .get(TenziScoresController.getUserScores)
    .delete(TenziScoresController.deleteUserScores);

router
    .route("/deleteUser/:userName")
    .delete(TenziScoresController.deleteUserAccount);

module.exports = router;
