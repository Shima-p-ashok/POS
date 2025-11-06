import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  productId: number;
  productName: string;
  productCode: string;
  category?: string;
  brand?: string;
  unitPrice: number;
  stockQuantity: number;
  description?: string;
  taxRate?: number;
  discount?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    productId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
    category: { type: String },
    brand: { type: String },
    unitPrice: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    description: { type: String },
    taxRate: { type: Number },
    discount: { type: Number },
    status: { type: String, default: "Active" },
    createdAt: { type: String, default: new Date().toISOString() },
    updatedAt: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
