import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  itemId: number;
  itemName: string;
  category: string;
  brand: string;
  unit: string;
  stockQty: number;
  purchaseRate: number;
  saleRate: number;
  taxPercent: number;
  barcode?: string;
  description?: string;
  createdAt: string;
  isActive: boolean;
}

const InventorySchema: Schema<IInventory> = new Schema(
  {
    itemId: { type: Number, required: true, unique: true },
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    unit: { type: String, required: true },
    stockQty: { type: Number, default: 0 },
    purchaseRate: { type: Number, required: true },
    saleRate: { type: Number, required: true },
    taxPercent: { type: Number, default: 0 },
    barcode: { type: String },
    description: { type: String },
    createdAt: { type: String, default: new Date().toISOString() },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Inventory = mongoose.model<IInventory>("Inventory", InventorySchema);
export default Inventory;
