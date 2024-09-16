const express = require("express");
const router = express.Router();

// GET all artists
router.get("/", function (req, res) {
  res.render("index");
});

// GET single artist detail
// router.get("/", function (req, res) {
//   res.render("index");
// });

// GET new artist form
// router.get("/", function (req, res) {
//   res.render("index");
// });

// POST new artist form
// router.get("/", function (req, res) {
//   res.render("index");
// });

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
