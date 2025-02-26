const { Router } = require("express");

const movieRouter = Router();

const movieController = require("../controller/movieController");

const upload = require("../middleware/multerMiddleware");

movieRouter.get("/", movieController.homePage);
movieRouter.get("/client", movieController.homePage);
movieRouter.get("/form", movieController.formPage);
movieRouter.post("/create", upload, movieController.form);
movieRouter.get("/view", movieController.view);

movieRouter.get("/delete/:id", movieController.delete);
movieRouter.get("/edit/:id", movieController.edit);
movieRouter.post("/update/:id", upload, movieController.update);
movieRouter.get("/signup", movieController.singupPage);
movieRouter.get("/signin", movieController.singinPage);
movieRouter.post("/adminCreate", movieController.createAdmincredential);
movieRouter.post("/checkCred", movieController.checkCredentials);

module.exports = movieRouter;
