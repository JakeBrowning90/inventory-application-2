const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const validateForm = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Title must contain between 1 and 60 characters."),
  body("artist")
    .notEmpty()
    .withMessage("Album must be credited to 1 or more artists."),
  body("year")
    .trim()
    .isInt({ min: 1800, max: 2100 })
    .withMessage("Release year must be between 1800 and 2100."),
  body("notes")
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Notes must contain between 1 and 1000 characters."),
];

exports.getAlbums = asyncHandler(async (req, res) => {
  const query = req.query.searchValue;
  let albums;
  if (query) {
    albums = await db.getSearchAlbums(query);
  } else {
    albums = await db.getAllAlbums();
  }
  res.render("albumList", {
    title: "Album Search",
    albums: albums,
    query: query,
  });
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
  if (req.user) {
    const artists = await db.getAllArtists();
    res.render("albumForm", {
      title: "New Album",
      artists: artists,
      backLink: "/albums",
      backText: "Back to Albums",
    });
  } else res.redirect("/login");
});

exports.postAlbumForm = [
  validateForm,
  asyncHandler(async (req, res) => {
    const album = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const artists = await db.getAllArtists();
      return res.status(400).render("albumForm", {
        title: "New Album",
        album: album,
        artists: artists,
        backLink: "/albums",
        backText: "Back to Albums",
        errors: errors.array(),
      });
    }
    await db.insertAlbum(album);
    res.redirect("/albums");
  }),
];

exports.getAlbumUpdate = asyncHandler(async (req, res) => {
  if (req.user) {
    const album = await db.getAlbumByID(req.params.id);
    const artists = await db.getAllArtists();
    res.render("albumForm", {
      title: "Update Album",
      album: album,
      artists: artists,
      backLink: `/albums/${req.params.id}/detail`,
      backText: "Back to Album Detail",
    });
  } else res.redirect("/login");
});

exports.postAlbumUpdate = [
  validateForm,
  asyncHandler(async (req, res) => {
    const album = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const artists = await db.getAllArtists();
      return res.status(400).render("albumForm", {
        title: "New Album",
        album: album,
        artists: artists,
        backLink: `/albums/${req.params.id}/detail`,
        backText: "Back to Album Detail",
        errors: errors.array(),
      });
    }

    await db.updateAlbum(req.params.id, album);
    res.redirect(`/albums/${req.params.id}/detail`);
  }),
];

exports.getAlbumDelete = asyncHandler(async (req, res) => {
  if (req.user) {
    // Get album
    const album = await db.getAlbumByID(req.params.id);
    // Get artists for album
    const artistList = await db.getArtistsByAlbum(req.params.id);
    res.render("albumDelete", {
      title: "Delete Album",
      album: album,
      artistList: artistList,
    });
  } else res.redirect("/login");
});

exports.postAlbumDelete = [
  asyncHandler(async (req, res) => {
    await db.deleteAlbum(req.params.id);
    res.redirect("/albums");
  }),
];
