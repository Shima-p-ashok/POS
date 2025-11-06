import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  companyId: number;
  companyName: string;
  website?: string;
  contactNumber?: string;
  email?: string;
  taxNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  invoicePrefix?: string;
  companyLogo?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}

const CompanySchema: Schema = new Schema<ICompany>(
  {
    companyId: { type: Number, required: true, unique: true },
    companyName: { type: String, required: true },
    website: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    taxNumber: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
    invoicePrefix: { type: String },
    companyLogo: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: String, default: new Date().toISOString() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompany>("Company", CompanySchema);
