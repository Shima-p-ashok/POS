// src/services/AttachmentService.ts
import type { Attachment } from "../../types/Common/AttachmentTypes";
import { API_ENDPOINTS } from "../../constants/API_ENDPOINTS";

interface ApiResponse<T> {
  statusCode: number;
  error: string | null;
  customMessage: string;
  isSucess: boolean;
  value: T;
}

/** Fetch all attachments for a table + record */
export const getAttachments = async (tableName: string, recordId: string | number): Promise<Attachment[]> => {
  try {
    const response = await fetch(API_ENDPOINTS.ATTACHMENT.GET_BY_TABLE_AND_RECORD(tableName, recordId), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result: ApiResponse<any[]> = await response.json();

    if (result.isSucess && Array.isArray(result.value)) {
      return result.value.map((item: any) => ({
        attachmentId: item.attachmentId,
        tableName: item.tableName,
        recordId: item.recordID,
        fileName: item.fileName,
        filePath: item.filePath,
        fileSize: item.fileSize || 0,
        fileType: item.fileType || item.attachmentType,
        description: item.description || "",
        uploadedBy: item.uploadedBy,
        uploadedAt: item.uploaddedOn, // backend typo
        updatedAt: item.updatedOn || item.uploaddedOn,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching attachments:", error);
    throw error;
  }
};

/** Upload attachment */
export const uploadAttachment = async (formData: FormData): Promise<Attachment> => {
  try {
    const response = await fetch(API_ENDPOINTS.ATTACHMENT.UPLOAD, { method: "POST", body: formData });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Upload failed with status: ${response.status}`);
    }

    const result: ApiResponse<any> = await response.json();
    if (result.isSucess && result.value) {
      const item = result.value;
      return {
        attachmentId: item.attachmentId,
        tableName: item.tableName,
        recordId: item.recordID,
        fileName: item.fileName,
        filePath: item.filePath,
        fileSize: item.fileSize || 0,
        fileType: item.fileType || item.attachmentType,
        description: item.description || "",
        uploadedBy: item.uploadedBy,
        uploadedAt: item.uploaddedOn,
        updatedAt: item.updatedOn || item.uploaddedOn,
      };
    }

    throw new Error(result.customMessage || "Upload failed");
  } catch (error) {
    console.error("Error uploading attachment:", error);
    throw error;
  }
};

/** Delete attachment */
export const deleteAttachment = async (attachmentId: number, deletedBy: string): Promise<void> => {
  try {
    const response = await fetch(API_ENDPOINTS.ATTACHMENT.DELETE(attachmentId, deletedBy), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result: ApiResponse<any> = await response.json();
    if (!result.isSucess) throw new Error(result.customMessage || "Delete failed");
    console.log("Attachment deleted successfully");
  } catch (error) {
    console.error("Error deleting attachment:", error);
    throw error;
  }
};

/** Download attachment */
export const downloadAttachment = async (attachmentId: number, fileName: string): Promise<void> => {
  try {
    const response = await fetch(API_ENDPOINTS.ATTACHMENT.DOWNLOAD(attachmentId), { method: "GET" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading attachment:", error);
    throw error;
  }
};

/** Get attachment by ID */
export const getAttachmentById = async (attachmentId: number): Promise<Attachment> => {
  try {
    const response = await fetch(API_ENDPOINTS.ATTACHMENT.GET_BY_ID(attachmentId), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result: ApiResponse<any> = await response.json();

    if (result.isSucess && result.value) {
      const item = result.value;
      return {
        attachmentId: item.attachmentId,
        tableName: item.tableName,
        recordId: item.recordID,
        fileName: item.fileName,
        filePath: item.filePath,
        fileSize: item.fileSize || 0,
        fileType: item.fileType || item.attachmentType,
        description: item.description || "",
        uploadedBy: item.uploadedBy,
        uploadedAt: item.uploaddedOn,
        updatedAt: item.updatedOn || item.uploaddedOn,
      };
    }

    throw new Error(result.customMessage || "Failed to fetch attachment");
  } catch (error) {
    console.error("Error fetching attachment details:", error);
    throw error;
  }
};
