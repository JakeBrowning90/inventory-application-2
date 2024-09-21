const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getArtists = asyncHandler(async (req, res) => {
  const artists = await db.getAllArtists();
  res.render("listView", { title: "Artist", artists: artists });
});

exports.getArtistDetail = asyncHandler(async (req, res) => {
  const artist = await db.getArtistByID(req.params.id);
  res.render("itemDetail", { title: "Artist Detail", artist: artist });
});
