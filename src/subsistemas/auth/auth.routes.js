const router = require("express").Router();
const controller = require("./auth.controller");
const authenticate = require("../../shared/middlewares/authenticate");
router.post("/login", controller.login);
router.get("/me", authenticate, controller.me);
module.exports = router;
