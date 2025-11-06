import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  categoryId: number;
  code: number;
  categoryName: string;
  isActive: boolean;
  createdAt: string;
}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    categoryId: { type: Number, required: true, unique: true },
    code: { type: Number, required: true },
    categoryName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: String, default: new Date().toISOString() },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", CategorySchema);