const { default: mongoose } = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://shubhamparekh04:1234@cluster0.a9fh8.mongodb.net/movies"
    );
    console.log("Database Connected...!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = db;
