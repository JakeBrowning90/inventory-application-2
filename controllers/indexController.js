const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getIndex = asyncHandler(async (req, res) => {
  const artistCount = await db.getArtistCount();
  const albumCount = await db.getAlbumCount();
  res.render("index", {
    title: "Homepage",
    artistCount: artistCount[0].count,
    albumCount: albumCount[0].count,
  });
});

exports.getTutorial = asyncHandler(async (req, res) => {
  res.render("tutorial", { title: "Tutorial" });
});

exports.getLogin = asyncHandler(async (req, res) => {});
