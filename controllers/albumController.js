const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getAlbums = asyncHandler(async (req, res) => {
  const albums = await db.getAllAlbums();
  res.render("listView", { title: "Album", albums: albums });
});

exports.getAlbumDetail = asyncHandler(async (req, res) => {
  // Get album
  const album = await db.getAlbumByID(req.params.id);
  // Get artists for album
  const artistList = await db.getArtistsByAlbum(req.params.id);
  res.render("itemDetail", {
    title: "Album Detail",
    album: album,
    artistList: artistList,
  });
});

exports.getAlbumForm = asyncHandler(async (req, res) => {
  const artists = await db.getAllArtists();
  res.render("albumForm", { title: "New Album", artists: artists });
});

exports.postAlbumForm = [
  asyncHandler(async (req, res) => {
    const album = req.body;
    // console.log(album);
    await db.insertAlbum(album);
    res.redirect("/albums");
  }),
];
