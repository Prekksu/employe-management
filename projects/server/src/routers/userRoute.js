const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;
const { fileUploader } = require("../middlewares/multer");
const checkRole = require("../middlewares/roleDecoder");

router.get("/", userController.getAll);
router.post("/", userController.createUser);
router.patch("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);

router.post(
	"/:id",
	fileUploader({ destinationFolder: "userImg" }).single("userImg"),
	userController.insertImage
);

router.post(
	"/assign-position",
	checkRole.checkUser,
	userController.assignPosition
);
router.post(
	"/assign-company",
	checkRole.checkUser,
	userController.assignCompany
);

module.exports = router;
