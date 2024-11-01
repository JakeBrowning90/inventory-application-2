const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

// GET homepage
router.get("/", indexController.getIndex);

// router.get("/search", indexController.getSearch);

// GET tutorial page
router.get("/about", indexController.getAbout);

// GET new entry option page
router.get("/new", indexController.getNew);

// GET login page
router.get("/login", indexController.getLogin);

// GET logout 
router.get("/logout", indexController.getLogout);

// Post login page
router.post("/login", indexController.postLogin);

// GET signup page
// router.get("/signup", indexController.getSignup);

// Post signup page
// router.post("/signup", indexController.postSignup);

module.exports = router;
