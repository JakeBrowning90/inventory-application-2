const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.getAlbums = asyncHandler(async (req, res) => {
  const albums = await db.getAllAlbums();
  res.render("listView", { title: "Album", albums: albums });
});

exports.getAlbumDetail = asyncHandler(async (req, res) => {
  const album = await db.getAlbumByID(req.params.id);
  res.render("itemDetail", { title: "Album Detail", album: album });
});