import { Request, Response } from "express";
import { AttachmentService } from "../../Services/Common/AttchmentServices";
import { ResponseHandler } from "../../utils/ResponseHandler";

export const AttachmentController = {
  /**
   * ✅ Get all attachments for specific record
   */
  async getByTableAndRecord(req: Request, res: Response) {
    try {
      const { tableName, recordId } = req.params;

      if (!tableName || !recordId)
        return ResponseHandler.error(res, null, "Missing parameters", 400);

      const data = await AttachmentService.list(tableName, Number(recordId));

      return ResponseHandler.success(res, data, "Attachments fetched successfully");
    } catch (error: any) {
      return ResponseHandler.error(res, error, "Failed to fetch attachments");
    }
  },

  /**
   * ✅ Upload a file
   */
  async upload(req: Request, res: Response) {
  try {
    if (!req.file)
      return ResponseHandler.error(res, null, "No file uploaded", 400);

    const { tableName, recordId, uploadedBy, description } = req.body;

    if (!tableName || !recordId)
      return ResponseHandler.error(res, null, "Missing parameters", 400);

    const saved = await AttachmentService.upload({
      tableName,
      recordId: Number(recordId),
      fileName: req.file.originalname,
      filePath: req.file.path, // now includes subfolder
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      description,
      uploadedBy,
    });

    return ResponseHandler.success(res, saved, "File uploaded successfully");
  } catch (error: any) {
    return ResponseHandler.error(res, error, "File upload failed");
  }
},

  /**
   * ✅ Download by ID
   */
  async download(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return ResponseHandler.error(res, null, "Missing attachment ID", 400);

      const attachment = await AttachmentService.download(id);

      if (!attachment)
        return ResponseHandler.error(res, null, "File not found", 404);

      return res.download(attachment.filePath, attachment.fileName);
    } catch (error: any) {
      return ResponseHandler.error(res, error, "Download failed");
    }
  },

  /**
   * ✅ Delete by ID
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { deletedBy } = req.body;

      if (!id)
        return ResponseHandler.error(res, null, "Attachment ID missing", 400);

      const result = await AttachmentService.delete(
        id,
        String(deletedBy || "Unknown User")
      );

      return ResponseHandler.success(res, result, "Attachment deleted successfully");
    } catch (error: any) {
      return ResponseHandler.error(res, error, "Failed to delete attachment");
    }
  },
};
