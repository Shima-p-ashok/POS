import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../Controllers/SettingsController/ProductController";

const router = express.Router();

// ✅ CRUD Routes
router.post("/", createProduct);       // Create Product
router.get("/", getProducts);          // Get All Products
router.get("/:id", getProductById);    // Get Product by ID
router.put("/:id", updateProduct);     // Update Product
router.delete("/:id", deleteProduct);  // Delete Product

export default router;
