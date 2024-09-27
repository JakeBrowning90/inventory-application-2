const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getArtists = asyncHandler(async (req, res) => {
  const artists = await db.getAllArtists();
  res.render("listView", { title: "Artist", artists: artists });
});

exports.getArtistDetail = asyncHandler(async (req, res) => {
  // Get artist
  const artist = await db.getArtistByID(req.params.id);
  // Get albums by artist
  const albumList = await db.getAlbumsByArtist(req.params.id);
  res.render("itemDetail", {
    title: "Artist Detail",
    artist: artist,
    albumList: albumList,
  });
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

exports.getArtistUpdate = asyncHandler(async (req, res) => {
  const artist = await db.getArtistByID(req.params.id);
  res.render("artistForm", { title: "Update Artist / Group", artist: artist });
});

exports.postArtistUpdate = [
  asyncHandler(async (req, res) => {
    const artist = req.body;
    await db.updateArtist(req.params.id, artist);
    res.redirect(`/artists/${req.params.id}/detail`);
  }),
];
