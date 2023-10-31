const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.check, userController.getAll);
router.get("/:id", checkRole.check, userController.getUsersById);
router.post(
	"/",
	checkRole.check,
	fileUploader({ destinationFolder: "userImg" }).single("userImg"),
	userController.createUser
);
router.patch("/:id", checkRole.check, userController.editUser);
router.patch("/admin/:id", checkRole.check, userController.adminEditUser);
router.delete("/:id", checkRole.checkAdmin, userController.deleteUser);

router.post(
	"/:id",
	checkRole.check,
	fileUploader({ destinationFolder: "userImg" }).single("userImg"),
	userController.insertImage
);

module.exports = router;
