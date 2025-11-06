import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  customerId: number;
  customerName: string;
  contactPerson: string;
  phoneNo: string;
  email: string;
  website?: string;
  address: string;
  gstNumber?: string; 
  createdAt: string;
  isActive: boolean;
}

const CustomerSchema: Schema = new Schema<ICustomer>(
  {
    customerId: { type: Number, required: true, unique: true },
    customerName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    address: { type: String, required: true },
    gstNumber: { type: String },
    createdAt: { type: String, default: new Date().toISOString() },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
