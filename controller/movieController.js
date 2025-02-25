const movieModel = require("../models/movieSchema");

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
    await movieModel.findByIdAndDelete(id);
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

    updateData.thumbnail = req.file ? req.file.path : req.body.old_thumbnail;

    await movieModel.findByIdAndUpdate(id, updateData);
    res.redirect("/view");
  } catch (error) {
    console.log(error.message);
    res.redirect("/view");
  }
};
