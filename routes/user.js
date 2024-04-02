const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  // Signup Form
  .get(userController.renderSignupForm)
  // Sign up
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  // Show login page
  .get(userController.renderLoginForm)
  // login post
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      faulireRedirect: "/login",
      failureflash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
