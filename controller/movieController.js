const adminModel = require("../models/adminSchema");
const movieModel = require("../models/movieSchema");

const fs = require("fs");

module.exports.homePage = (req, res) => {
  return res.render("index");
};

module.exports.formPage = (req, res) => {
  return res.render("./pages/form");
};

module.exports.form = (req, res) => {
  movieModel.create({ ...req.body, thumbnail: req.file.path });
  console.log(req.body);
  console.log(req.file.path);
  console.log("Data entered successfully...!");
  return res.render("./pages/form");
};

module.exports.view = async (req, res) => {
  try {
    const movies = await movieModel.find();
    return res.render("./pages/view", { movies });
  } catch (error) {
    console.log(error.message);
    return res.render("./pages/view", { movies: {} });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndDelete(id);
    fs.unlinkSync(movie.thumbnail);
    res.redirect("/view");
  } catch (error) {
    console.log(error.message);
    res.redirect("/view");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);

    if (movie) {
      console.log("Movie found:", movie);
      res.render("./pages/edit", { movie });
    } else {
      console.log("Movie not found");
      res.render("./pages/edit", { movie: {} });
    }
  } catch (error) {
    console.log("Error fetching movie:", error.message);
    res.render("./pages/edit", { movie: {} });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (req.file) {
      const movie = await movieModel.findById(id);
      fs.unlinkSync(movie.thumbnail);
      updateData.thumbnail = req.file.path;
    } else {
      updateData.thumbnail = req.body.old_thumbnail;
    }

    await movieModel.findByIdAndUpdate(id, updateData);
    res.redirect("/view");
  } catch (error) {
    console.log(error.message);
    res.redirect("/view");
  }
};

module.exports.singupPage = (req, res) => {
  res.render("./pages/signup");
};

module.exports.singinPage = (req, res) => {
  res.render("./pages/signin");
};

module.exports.createAdmincredential = async (req, res) => {
  let { password, confirm_password } = req.body;

  if (password === confirm_password) {
    await adminModel.create(req.body);
    res.render("./pages/signin", req.body);
  } else {
    console.log("password & confirm password should be same...!");
    res.render("./pages/signin", req.body);
  }
};

module.exports.checkCredentials = async (req, res) => {
  const { username, password } = req.body;

  let cred = await adminModel.findOne({ username });

  if (!cred) {
    console.log("User not found!");
    return res.redirect("/signin");
  }

  if (cred.username === username && cred.password === password) {
    res.render("./clientIndex");
  } else {
    console.log("Invalid credentials!");
    res.redirect("/signin");
  }
};
