const { body, validationResult } = require("express-validator");
// const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getArtists = asyncHandler(async(req, res) => {
    res.render("listView");
}) 
