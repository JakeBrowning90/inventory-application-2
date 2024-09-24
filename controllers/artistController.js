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

exports.getArtistForm = asyncHandler(async (req, res) => {
  res.render("artistForm", { title: "New Artist / Group" });
});

exports.postArtistForm = [
  asyncHandler(async (req, res) => {
    const artist = req.body;
    await db.insertArtist(artist);
    res.redirect("/artists");
  }),
];
