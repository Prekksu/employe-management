const express = require("express");
const router = express.Router();
const companyController = require("../controllers").companyController;
const checkRole = require("../middlewares/roleDecoder");

router.get("/", companyController.getAll);
router.get("/:id", companyController.getCompanyById);
router.post("/", checkRole.checkAdmin, companyController.createCompany);
router.patch("/:id", checkRole.checkAdmin, companyController.editCompany);
router.delete("/:id", checkRole.checkAdmin, companyController.deleteCompany);

module.exports = router;
