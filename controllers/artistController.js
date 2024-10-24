const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const validateForm = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 60 })
    .withMessage("Name must contain between 1 and 60 characters."),
  body("activeyear")
    .trim()
    .isInt({ min: 1800, max: 2100 })
    .withMessage("First active year must be between 1800 and 2100."),
  body("notes")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Notes must contain between 1 and 1000 characters."),
];

exports.getArtists = asyncHandler(async (req, res) => {
  const query = req.query.searchValue;
  // Get all artists or by query match
  let artists;
  if (query) {
    artists = await db.getSearchArtists(query);
  } else {
    artists = await db.getAllArtists();
  }
  res.render("artistList", {
    title: "Artist Search",
    artists: artists,
    query: query,
  });
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
  if (req.user) {
    res.render("artistForm", {
      title: "New Artist / Group",
      backLink: "/",
      backText: "Back",
    });
  } else res.redirect("/login");
});

exports.postArtistForm = [
  validateForm,
  asyncHandler(async (req, res) => {
    const artist = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Show form with error messages
      return res.status(400).render("artistForm", {
        title: "New Artist / Group",
        artist: artist,
        backLink: "/artists",
        backText: "Back to Artists",
        errors: errors.array(),
      });
    }
    await db.insertArtist(artist);
    // TODO: Redirect to new Artist entry
    res.redirect("/");
  }),
];

exports.getArtistUpdate = asyncHandler(async (req, res) => {
  if (req.user) {
    const artist = await db.getArtistByID(req.params.id);
    res.render("artistForm", {
      title: "Update Artist / Group",
      artist: artist,
      backLink: `/artists/${req.params.id}/detail`,
      backText: "Back to Artist Detail",
    });
  } else res.redirect("/login");
});

exports.postArtistUpdate = [
  validateForm,
  asyncHandler(async (req, res) => {
    const artist = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Show form with error messages
      return res.status(400).render("artistForm", {
        title: "Update Artist / Group",
        artist: artist,
        backLink: `/artists/${req.params.id}/detail`,
        backText: "Back to Artist Detail",
        errors: errors.array(),
      });
    }
    await db.updateArtist(req.params.id, artist);
    res.redirect(`/artists/${req.params.id}/detail`);
  }),
];

exports.getArtistDelete = asyncHandler(async (req, res) => {
  if (req.user) {
    // Get artist
    const artist = await db.getArtistByID(req.params.id);
    // Get albums by artist
    const albumList = await db.getAlbumsByArtist(req.params.id);
    res.render("artistDelete", {
      title: "Delete Artist",
      artist: artist,
      albumList: albumList,
    });
  } else res.redirect("/login");
});

exports.postArtistDelete = [
  asyncHandler(async (req, res) => {
    await db.deleteArtist(req.params.id);
    res.redirect("/");
  }),
];
