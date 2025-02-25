const redirectMiddleware = (req, res, next) => {
  if (req.path === "/") {
    res.redirect("/client");
  }
  next();
};

module.exports = redirectMiddleware;
