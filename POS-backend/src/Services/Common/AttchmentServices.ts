import Attachment, { IAttachment } from "../../Types/Common/AttachmentTypes";
import fs from "fs";
import path from "path";

interface UploadAttachmentData {
  tableName: string;
  recordId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  description?: string;
  uploadedBy: string;
}

export const AttachmentService = {
  async listAll() {
    return Attachment.find({ deleted: false }).sort({ uploadedAt: -1 }).lean();
  },

  async list(tableName: string, recordId: number) {
    return (
      (await Attachment.find({ tableName, recordId, deleted: false })
        .sort({ uploadedAt: -1 })
        .lean()) || []
    );
  },

  async upload(data: UploadAttachmentData) {
    const lastAttachment = await Attachment.findOne().sort({ attachmentId: -1 });
    const nextId = (lastAttachment?.attachmentId ?? 0) + 1;

    const newAttachment = new Attachment({
      ...data,
      attachmentId: nextId,
      attachmentName: data.fileName,
      attachmentType: data.fileType,
      uploadedAt: new Date(),
      deleted: false,
    });

    return newAttachment.save();
  },

  async download(attachmentId: string | number) {
    const attachment = await Attachment.findOne({
      attachmentId: Number(attachmentId),
      deleted: false,
    }).lean();

    if (!attachment) throw new Error("File not found");
    return attachment;
  },

  async delete(attachmentId: string | number, deletedBy: string) {
    const attachment = await Attachment.findOne({
      attachmentId: Number(attachmentId),
      deleted: false,
    });

    if (!attachment) throw new Error("Attachment not found");

    const filePath = path.resolve(attachment.filePath);

    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      } else {
        console.warn(`⚠️ File missing on disk: ${filePath}`);
      }
    } catch (err) {
      console.error(`❌ Error deleting file: ${filePath}`, err);
    }

    attachment.deleted = true;
    attachment.updatedAt = new Date();
    await attachment.save();

    console.log(`[AttachmentService] ${attachment.fileName} deleted by ${deletedBy}`);
    return { message: `Attachment deleted by ${deletedBy}` };
  },
};
