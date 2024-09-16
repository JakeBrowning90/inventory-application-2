const express = require("express");
const router = express.Router();

// GET homepage
router.get("/", function (req, res) {
  res.send("Hello world!");
});

module.exports = router;
