const express = require("express");
const router = express.Router();
const positionController = require("../controllers").positionController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", checkRole.check, positionController.getAll);
router.get("/:id", checkRole.check, positionController.getPositionById);
router.post("/", checkRole.checkUser, positionController.createPosition);
router.patch("/:id", checkRole.checkUser, positionController.editPosition);
router.delete("/:id", checkRole.checkAdmin, positionController.deletePosition);

module.exports = router;
