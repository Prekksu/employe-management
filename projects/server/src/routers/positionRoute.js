const express = require("express");
const router = express.Router();
const positionController = require("../controllers").positionController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", positionController.getAll);
router.post("/", checkRole.checkUser, positionController.createPosition);
router.patch("/:id", checkRole.checkUser, positionController.editPosition);
router.delete("/:id", checkRole.checkUser, positionController.deletePosition);

module.exports = router;
