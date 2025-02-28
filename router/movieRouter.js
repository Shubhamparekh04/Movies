const { Router } = require("express");
const movieRouter = Router();

const movieController = require("../controller/movieController");

const upload = require("../middleware/multerMiddleware");
const userAuth = require("../middleware/userAuth");

movieRouter.get("/signup", movieController.singupPage);
movieRouter.get("/signin", movieController.singinPage);
movieRouter.post("/adminCreate", movieController.createAdmincredential);
movieRouter.post("/checkCred", movieController.checkCredentials);

movieRouter.use(userAuth);

movieRouter.get("/client", movieController.homePage);
movieRouter.get("/", movieController.homePage);
movieRouter.get("/form", movieController.formPage);
movieRouter.post("/create", upload, movieController.form);
movieRouter.get("/view", movieController.view);
movieRouter.get("/delete/:id", movieController.delete);
movieRouter.get("/edit/:id", movieController.edit);
movieRouter.post("/update/:id", upload, movieController.update);
movieRouter.get("/logout", movieController.logOut);
movieRouter.get("/clientIndex", movieController.clientHomepage);
movieRouter.get("/about",movieController.aboutPage);
movieRouter.get("/contact",movieController.contactPage);
movieRouter.get("/joinus",movieController.joinusPage);
movieRouter.get("/review",movieController.reviewPage);
movieRouter.get("/single/:id",movieController.singlePage);

module.exports = movieRouter;
