const express = require("express");
const router = express.Router();

//const AuthenticationController = require("../controllers/userControl");
const verifySignUp = require("../middleware/verifySignUp");
const authController = require("../controllers/authenticationControl");
const userController = require("../controllers/userControl");

router.post(
  "/auth/register",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.register
);
router.post("/auth/login", authController.login);
router.get("/all", userController.allAccess);
router.get("/user", verifySignUp.checkRolesExisted, userController.userBoard);
router.get(
  "/moderator",
  verifySignUp.checkRolesExisted,
  userController.moderatorBoard
);
router.get("/admin", verifySignUp.checkRolesExisted, userController.adminBoard);

module.exports = router;
