const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    moviename: String,
    thumbnail: String,
    description: String,
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movieModel", movieSchema);
module.exports = movieModel;