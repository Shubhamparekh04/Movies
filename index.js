const express = require("express");
const movieModel = require("./models/movieSchema");
const db = require("./config/database");
const multer = require("multer");
const port = 8087;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/", require("./router/movieRouter"));

app.listen(port, (err) => {
  db();
  if (!err) {
    console.log("server runs on\nhttp://localhost:" + port);
  }
});