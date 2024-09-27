const express = require("express");
const router = express.Router();

const albumController = require("../controllers/albumController");

// GET all albums
router.get("/", albumController.getAlbums);

// GET single album detail
router.get("/:id/detail", albumController.getAlbumDetail);

// GET new artist form
router.get("/new", albumController.getAlbumForm);

// POST new artist form
router.post("/new", albumController.postAlbumForm);

// GET UPDATE album form
router.get("/:id/update", albumController.getAlbumUpdate);

// POST UPDATE album form
router.post("/:id/update", albumController.postAlbumUpdate);

// GET DELETE album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST DELETE album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

module.exports = router;