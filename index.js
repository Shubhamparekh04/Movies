const express = require("express");
const movieModel = require("./models/movieSchema");
const db = require("./config/database");
const multer = require("multer");
const port = 8087;
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));


app.use("/", require("./router/movieRouter"));


app.listen(port, (err) => {
  db();
  if (!err) {
    console.log("server runs on\nhttp://localhost:" + port);
  }
});