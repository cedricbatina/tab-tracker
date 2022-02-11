const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.post("/songs", songController.createSong);
router.get("/songs", songController.getAllSongs);
router.get("/song/:id", songController.getOneSong);
router.put("/song/update/:id", songController.updateSong);
router.delete("/songs/delete/:id", songController.deleteSong);

module.exports = router;
