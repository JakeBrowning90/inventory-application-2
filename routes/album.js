const express = require("express");
const router = express.Router();

// GET all albums
router.get("/", function (req, res) {
  res.render("index");
});

// GET single album detail
// router.get("/", function (req, res) {
//   res.render("index");
// });

// GET new album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST new album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// GET UPDATE album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST UPDATE album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// GET DELETE album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST DELETE album form
// router.get("/", function (req, res) {
//   res.render("index");
// });

module.exports = router;