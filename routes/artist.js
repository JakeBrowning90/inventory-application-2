const express = require("express");
const router = express.Router();

const artistController = require("../controllers/artistController");

// GET all artists
router.get("/", artistController.getArtists);

// GET single artist detail
router.get("/:id/detail", artistController.getArtistDetail);

// GET new artist form
router.get("/new", artistController.getArtistForm);

// POST new artist form
router.post("/new", artistController.postArtistForm);

// GET UPDATE artist form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST UPDATE artist form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// GET DELETE artist form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST DELETE artist form
// router.get("/", function (req, res) {
//   res.render("index");
// });

module.exports = router;
