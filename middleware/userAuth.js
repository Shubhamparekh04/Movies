const userAuth = (req, res, next) => {

  let { userId } = req.cookies;

  if (userId) {
    return next();
  } else {
    res.redirect("/signin");
  }
};

module.exports = userAuth;
