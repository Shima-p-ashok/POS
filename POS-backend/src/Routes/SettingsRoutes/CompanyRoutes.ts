import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../../Controllers/SettingsController/CompanyController";

const router = express.Router();

// ✅ CRUD Routes
router.post("/", createCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
