import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productId: number;
  productName: string;
  categoryId: number;
  categoryName?: string;
  brand?: string;
  description?: string;
  unit?: string;
  sku?: string;
  barcode?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  stockQuantity?: number;
  taxRate?: number;
  imageUrl?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    productId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    categoryId: { type: Number, required: true },
    categoryName: { type: String },
    brand: { type: String },
    description: { type: String },
    unit: { type: String },
    sku: { type: String },
    barcode: { type: String },
    purchasePrice: { type: Number },
    sellingPrice: { type: Number },
    stockQuantity: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: String, default: new Date().toISOString() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
