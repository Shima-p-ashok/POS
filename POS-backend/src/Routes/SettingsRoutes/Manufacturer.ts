import express from "express";
import {
  createManufacturer,
  getManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer,
} from "../../Controllers/SettingsController/ManufacturerController";

const router = express.Router();

// ✅ CRUD Routes
router.post("/", createManufacturer);
router.get("/", getManufacturers);
router.get("/:id", getManufacturerById);
router.put("/:id", updateManufacturer);
router.delete("/:id", deleteManufacturer);

export default router;
