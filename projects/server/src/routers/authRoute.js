const express = require("express");
const router = express.Router();
const authController = require("../controllers").authController;

router.post("/", authController.register);
router.get("/login", authController.login);

router.post("/reset-password", authController.resetPassword);
router.patch(
	"/verify-password",
	authController.getToken,
	authController.verify
);

module.exports = router;
