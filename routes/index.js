const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// GET homepage
router.get("/", indexController.getIndex);

// GET tutorial page
router.get("/tutorial", indexController.getTutorial);

// GET login page
router.get("/login", indexController.getLogin);


module.exports = router;
