const express = require("express");
const router = express.Router();
const positionController = require("../controllers").positionController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", positionController.getAll);
router.post("/", checkRole.checkAdmin, positionController.createPosition);
router.patch("/:id", checkRole.checkAdmin, positionController.editPosition);
router.delete("/:id", checkRole.checkAdmin, positionController.deletePosition);

module.exports = router;
