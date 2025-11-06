import mongoose, { Schema, Document } from "mongoose";

export interface IManufacturer extends Document {
  manufacturerId: number;
  manufacturerName: string;
  description?: string;
  categoryName?: string;
  productName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}

const ManufacturerSchema: Schema = new Schema<IManufacturer>(
  {
    manufacturerId: { type: Number, required: true, unique: true },
    manufacturerName: { type: String, required: true },
    description: { type: String },
    categoryName: { type: String },
    productName: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    website: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: String, default: new Date().toISOString() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IManufacturer>("Manufacturer", ManufacturerSchema);
