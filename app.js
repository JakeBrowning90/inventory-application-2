require("dotenv").config;

const express = require("express");
//Routers
const indexRouter = require("./routes/index");
// const categoryRouter = require("./routes/category");
// const itemRouter = require("./routes/item");

const app = express();
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
// app.use("/", categoryRouter);
// app.use("/", itemRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
