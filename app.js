require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");



//Routers
const indexRouter = require("./routes/index");
const artistRouter = require("./routes/artist");
const albumRouter = require("./routes/album");

const app = express();

const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/artists/new", upload.single("image"), async (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    res.locals.result = result

  }
  upload(req);
  next();
});

const path = require("node:path");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// TEST: LOCAL IMG
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'public/uploads/')
// )},
//   filename: (req, file, cb) => {
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// function uploadFiles(req, res, next) {
  // console.log(req.body);
  // console.log(req.files);
  // res.json({ message: "Successfully uploaded files" });
//   next();
// }

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);

app.get("*", function (req, res) {
  res.render("404", { title: "Error 404" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
