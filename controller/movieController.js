const fs = require("fs");
const movieModel = require("../models/movieSchema");
const adminModel = require("../models/adminSchema");

module.exports.homePage = (req, res) => {
  return res.render("index");
};

module.exports.formPage = (req, res) => {
  return res.render("./pages/form");
};

// Add a new movie with correct file handling
module.exports.form = async (req, res) => {
  try {
    if (!req.files || !req.files.thumbnail || !req.files.slider) {
      console.log("Files missing!");
      return res
        .status(400)
        .send("Both Thumbnail and Slider images are required.");
    }

    await movieModel.create({
      ...req.body,
      thumbnail: req.files.thumbnail[0].path, // Correctly access uploaded thumbnail
      slider: req.files.slider[0].path, // Correctly access uploaded slider
    });

    console.log("Movie Data:", req.body);
    console.log("Thumbnail Path:", req.files.thumbnail[0].path);
    console.log("Slider Path:", req.files.slider[0].path);
    console.log("Data entered successfully!");

    return res.redirect("/view"); // Redirect to view page instead of re-rendering form
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).send("Error adding movie.");
  }
};

// View all movies
module.exports.view = async (req, res) => {
  try {
    const movies = await movieModel.find();
    return res.render("./pages/view", { movies });
  } catch (error) {
    console.log(error.message);
    return res.render("./pages/view", { movies: {} });
  }
};

// Delete a movie and remove associated files
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndDelete(id);

    if (movie) {
      if (movie.thumbnail) fs.unlinkSync(movie.thumbnail);
      if (movie.slider) fs.unlinkSync(movie.slider);
    }

    res.redirect("/view");
  } catch (error) {
    console.log(error.message);
    res.redirect("/view");
  }
};

// Edit movie - load movie details
module.exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);

    if (movie) {
      res.render("./pages/edit", { movie });
    } else {
      res.render("./pages/edit", { movie: {} });
    }
  } catch (error) {
    console.log("Error fetching movie:", error.message);
    res.render("./pages/edit", { movie: {} });
  }
};

// Update movie details and replace images if needed
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);
    let updateData = { ...req.body };

    if (req.files.thumbnail) {
      if (movie.thumbnail) fs.unlinkSync(movie.thumbnail);
      updateData.thumbnail = req.files.thumbnail[0].path;
    } else {
      updateData.thumbnail = req.body.old_thumbnail;
    }

    if (req.files.slider) {
      if (movie.slider) fs.unlinkSync(movie.slider);
      updateData.slider = req.files.slider[0].path;
    } else {
      updateData.slider = req.body.old_slider;
    }

    await movieModel.findByIdAndUpdate(id, updateData);
    res.redirect("/view");
  } catch (error) {
    console.log(error.message);
    res.redirect("/view");
  }
};

// Authentication and Client Pages
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
    console.log("Password & Confirm Password should be same!");
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
    res.cookie("userId", cred.id);
    return res.redirect("/");
  } else {
    console.log("Invalid credentials!");
    return res.redirect("/signin");
  }
};

module.exports.logOut = (req, res) => {
  res.clearCookie("userId");
  return res.redirect("/signin");
};

module.exports.clientHomepage = async (req, res) => {
  try {
    const movies = await movieModel.find(); // Fetch all movies from DB
    res.render("clientIndex", { movies }); // Send movies to EJS
  } catch (error) {
    console.log(error.message);
    res.render("clientIndex", { movies: {} }); // Send movies to EJS
  }
};

module.exports.aboutPage = (req, res) => {
  res.render("./pages/about");
};

module.exports.contactPage = (req, res) => {
  res.render("./pages/contact");
};
module.exports.joinusPage = (req, res) => {
  res.render("./pages/joinus");
};
module.exports.reviewPage = async (req, res) => {
  try {
    let movies = await movieModel.find({});
    res.render("./pages/review", { movies });
  } catch (error) {
    console.log(error.message);
    res.render("./pages/review", { movies: {} });
  }
};

module.exports.singlePage = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await movieModel.findById(id);
    res.render("./pages/single", { movie });
  } catch (error) {
    console.log(error.message);
    res.render("./pages/single", { movie: {} });
  }
};
