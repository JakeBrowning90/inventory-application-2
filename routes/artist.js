const express = require("express");
const router = express.Router();

const artistController = require("../controllers/artistController");

// GET all or searched artists
// router.get("/", artistController.getArtists);

// GET single artist detail
router.get("/:id/detail", artistController.getArtistDetail);

// GET new artist form
router.get("/new", artistController.getArtistForm);

// POST new artist form
router.post("/new", artistController.postArtistForm);

// GET UPDATE artist form
router.get("/:id/update", artistController.getArtistUpdate);

// POST UPDATE artist form
router.post("/:id/update", artistController.postArtistUpdate);

// GET DELETE artist form
router.get("/:id/delete", artistController.getArtistDelete);

// POST DELETE artist form
router.post("/:id/delete", artistController.postArtistDelete);

module.exports = router;
