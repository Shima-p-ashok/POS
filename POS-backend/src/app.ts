import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";

// -------------------- Routes -------------------- //
import customerRoutes from "./Routes/CustomerRoutes";
import inventoryRoutes from "./Routes/InventoryRoutes";

// Settings Routes
import categoryRoutes from "./Routes/SettingsRoutes/CategoryRoutes";
import companyRoutes from "./Routes/SettingsRoutes/CompanyRoutes";
import productRoutes from "./Routes/SettingsRoutes/ProductRoutes";
import manufacturerRoutes from "./Routes/SettingsRoutes/Manufacturer";

// Common Routes
import attachmentRoutes from "./Routes/Common/AttachmentRoutes";

const app = express();

// -------------------- Middleware -------------------- //
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- Database Connection -------------------- //
connectDB();

// -------------------- Base Route -------------------- //
app.get("/", (_req, res) => res.send("✅ POS Backend Running"));

// -------------------- API Routes -------------------- //
app.use("/api/customers", customerRoutes);
app.use("/api/inventories", inventoryRoutes);

// Settings Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/manufacturers", manufacturerRoutes);

// Common Routes
app.use("/api/attachments", attachmentRoutes);

// -------------------- Error Handlers -------------------- //
app.use((req, res) => {
  res.status(404).json({ isSuccess: false, customMessage: "Route not found" });
});

app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ isSuccess: false, customMessage: err.message });
});

export default app;
