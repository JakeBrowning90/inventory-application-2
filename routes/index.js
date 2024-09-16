const express = require("express");
const router = express.Router();

// GET homepage
router.get("/", function (req, res) {
  // TODO: Get totals for artists and albums to display on links
  res.render("index");
});

module.exports = router;
