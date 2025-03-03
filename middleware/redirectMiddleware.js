const redirectClientPage = (req, res, next) => {
  if (req.url === "/") {
    return res.redirect("/clientIndex");
  }

  return next();
};

module.exports = redirectClientPage;