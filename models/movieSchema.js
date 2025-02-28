// const { default: mongoose } = require("mongoose");

// const movieSchema = new mongoose.Schema(
//   {
//     moviename: String,
//     thumbnail: String,
//     description: String,
//   },
//   { timestamps: true }
// );

// const movieModel = mongoose.model("movieModel", movieSchema);
// module.exports = movieModel;

const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    moviename: String,
    thumbnail: String,
    slider: String,
    ryear: Number, 
    genre: String,
    cast: String,
    rating: Number,
    description: String,
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movieModel", movieSchema);
module.exports = movieModel;
