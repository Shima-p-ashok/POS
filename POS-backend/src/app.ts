import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";

// -------------------- Routes -------------------- //
import customerRoutes from "./Routes/CustomerRoutes";
import inventoryRoutes from "./Routes/InventoryRoutes";

// Settings-Routes
import categoryRoutes from "./Routes/SettingsRoutes/CategoryRoutes";
import companyRoutes from "./Routes/SettingsRoutes/CompanyRoutes";
import productRoutes from "./Routes/SettingsRoutes/ProductRoutes";
import manufacturerRoutes from "./Routes/SettingsRoutes/Manufacturer"; 

const app = express();

// -------------------- Middleware -------------------- //
app.use(cors());
app.use(express.json());

// -------------------- Database Connection -------------------- //
connectDB();

// -------------------- Base Route -------------------- //
app.get("/", (req, res) => res.send("✅ POS Backend Running"));

// -------------------- API Routes -------------------- //
app.use("/api/customers", customerRoutes);
app.use("/api/inventories", inventoryRoutes);

// Settings-Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/manufacturers", manufacturerRoutes); 

export default app;
