const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");
const checkRole = require("../middlewares/roleDecoder");

router.get("/", userController.getAll);
router.get("/:id", userController.getUsersById);
router.post(
	"/",
	fileUploader({ destinationFolder: "userImg" }).single("userImg"),
	userController.createUser
);
router.patch("/:id", userController.editUser);
router.patch("/admin/:id", userController.adminEditUser);
router.delete("/:id", userController.deleteUser);

router.post(
	"/:id",
	fileUploader({ destinationFolder: "userImg" }).single("userImg"),
	userController.insertImage
);

module.exports = router;
