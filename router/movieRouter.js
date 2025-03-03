const { Router } = require("express");
const movieRouter = Router();

const movieController = require("../controller/movieController");

const upload = require("../middleware/multerMiddleware");
const userAuth = require("../middleware/userAuth");

movieRouter.get("/signup", movieController.singupPage);
movieRouter.get("/signin", movieController.singinPage);
movieRouter.post("/adminCreate", movieController.createAdmincredential);
movieRouter.post("/checkCred", movieController.checkCredentials);
movieRouter.get("/clientIndex", movieController.clientHomepage);
movieRouter.get("/about", movieController.aboutPage);
movieRouter.get("/contact", movieController.contactPage);
movieRouter.get("/joinus", movieController.joinusPage);
movieRouter.get("/review", movieController.reviewPage);
movieRouter.get("/single/:id", movieController.singlePage);

movieRouter.use(userAuth);

movieRouter.get("/admin", movieController.homePage);
movieRouter.get("/form", movieController.formPage);
movieRouter.post("/create", upload, movieController.form);
movieRouter.get("/view", movieController.view);
movieRouter.get("/delete/:id", movieController.delete);
movieRouter.get("/edit/:id", movieController.edit);
movieRouter.post("/update/:id", upload, movieController.update);
movieRouter.get("/logout", movieController.logOut);

module.exports = movieRouter;
