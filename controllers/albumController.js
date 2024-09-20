const { body, validationResult } = require("express-validator");
// const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getAlbums = asyncHandler(async(req, res) => {
    res.render("listView", {title: "Album"});
}) 