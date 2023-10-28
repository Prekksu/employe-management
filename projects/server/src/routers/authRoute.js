const express = require("express");
const router = express.Router();
const authController = require("../controllers").authController;

router.post("/", authController.register);
router.post("/login", authController.login);
router.get("/getToken", authController.getToken, authController.getUserByToken);

router.post("/reset-password", authController.resetPassword);
router.patch(
	"/verify-password",
	authController.getToken,
	authController.verify
);

module.exports = router;
