const express = require("express");
const router = express.Router();
const companyController = require("../controllers").companyController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", companyController.getAll);
router.post("/", checkRole.checkUser, companyController.createCompany);
router.patch("/:id", checkRole.checkUser, companyController.editCompany);
router.delete("/:id", checkRole.checkUser, companyController.deleteCompany);

module.exports = router;
