const express = require("express");
const router = express.Router();

const AuthenticationController = require("../controllers/userControl");
const verifySignUp = require("../middleware/verifySignUp");
const userController = require("../controllers/authenticationControl");

router.post(
  "/register",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  userController.register
);

module.exports = router;
