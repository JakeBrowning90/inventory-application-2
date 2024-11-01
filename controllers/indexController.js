const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

exports.getIndex = asyncHandler(async (req, res) => {
  const query = req.query.searchValue;

  //Get artists
  let artistList;
  if (query) {
    artistList = await db.getSearchArtists(query);
  } else {
    artistList = await db.getAllArtists();
  }
  let artistCount = artistList.length;

  //Get albums
  let albumList;

  if (query) {
    albumList = await db.getSearchAlbums(query);
  } else {
    albumList = await db.getAllAlbums();
  }
  let albumCount = albumList.length;

  res.render("index", {
    title: "Homepage",
    query: query,
    artistCount: artistCount,
    artistList: artistList,
    albumCount: albumCount,
    albumList: albumList,
  });
});

exports.getNew = asyncHandler(async (req, res) => {
  if (req.user) {
    res.render("formSplit", { title: "Add New" });
  } else res.redirect("/login");
});

exports.getAbout = asyncHandler(async (req, res) => {
  res.render("about", { title: "App info" });
});

exports.getLogin = asyncHandler(async (req, res) => {
  res.render("login", { title: "Log In" });
});

exports.postLogin = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "login",
  }),
];

exports.getLogout = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.getSignup = asyncHandler(async (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

exports.postSignup = asyncHandler(async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        res.redirect("/sign-up");
      } else {
        await db.insertUser(req.body.username, hashedPassword);
        res.redirect("/");
      }
    });
  } catch (err) {
    return next(err);
  }
});
