const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// GET homepage
router.get("/", indexController.getIndex);

// GET tutorial page
router.get("/tutorial", indexController.getTutorial);

// GET login page
router.get("/login", indexController.getLogin);

// GET logiut 
router.get("/logout", indexController.getLogout);

// Post login page
router.post("/login", indexController.postLogin);

// GET signup page
// router.get("/signup", indexController.getSignup);

// Post signup page
// router.post("/signup", indexController.postSignup);

module.exports = router;
