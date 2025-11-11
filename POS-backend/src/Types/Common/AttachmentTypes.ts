// Backend: Types/Common/AttachmentTypes.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IAttachment extends Document {
  attachmentId: number;
  attachmentName: string;
  attachmentType: string;
  tableName: string;
  recordId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: Date;
  updatedAt?: Date;
  deleted?: boolean;
}

const AttachmentSchema = new Schema<IAttachment>(
  {
    attachmentId: { type: Number, required: true, unique: true },
    attachmentName: { type: String, required: true },
    attachmentType: { type: String, required: true },
    tableName: { type: String, required: true },
    recordId: { type: Number, required: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    description: { type: String },
    uploadedBy: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

AttachmentSchema.index({ tableName: 1, recordId: 1 });

export default mongoose.model<IAttachment>("Attachment", AttachmentSchema);
