// src/services/AttachmentService.ts
import type { Attachment } from "../../types/Common/AttachmentTypes";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api"; 

interface ApiResponse<T> {
  statusCode: number;
  error: string | null;
  customMessage: string;
  isSucess: boolean;
  value: T;
}

// ✅ Fetch all attachments by table + record
export const getAttachments = async (
  tableName: string,
  recordId: number
): Promise<Attachment[]> => {
  const response = await fetch(
    `${API_BASE_URL}/attachments/${encodeURIComponent(tableName)}/${recordId}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) throw new Error(`Error ${response.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: ApiResponse<any[]> = await response.json();

  if (result.isSucess && Array.isArray(result.value)) {
    return result.value.map((item) => ({
      attachmentId: item.attachmentId,
      tableName: item.tableName,
      recordId: item.recordId,
      fileName: item.fileName,
      filePath: item.filePath,
      fileSize: item.fileSize || 0,
      fileType: item.fileType || item.attachmentType,
      description: item.description || "",
      uploadedBy: item.uploadedBy,
      uploadedAt: item.uploadedAt || item.createdAt,
      updatedAt: item.updatedAt || item.createdAt,
    }));
  }

  return [];
};

// ✅ Upload attachment
export const uploadAttachment = async (
  data: FormData
): Promise<Attachment> => {
  const response = await fetch(`${API_BASE_URL}/attachments/upload`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: ApiResponse<any> = await response.json();

  if (result.isSucess && result.value) {
    const item = result.value;
    return {
      attachmentId: item.attachmentId,
      tableName: item.tableName,
      recordId: item.recordId,
      fileName: item.fileName,
      filePath: item.filePath,
      fileSize: item.fileSize || 0,
      fileType: item.fileType || item.attachmentType,
      description: item.description || "",
      uploadedBy: item.uploadedBy,
      uploadedAt: item.uploadedAt || item.createdAt,
      updatedAt: item.updatedAt || item.createdAt,
    };
  }

  throw new Error(result.customMessage || "Upload failed");
};

// ✅ Delete attachment
export const deleteAttachment = async (
  attachmentId: number,
  deletedBy: string
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/attachments/${attachmentId}?deletedBy=${deletedBy}`,
    { method: "DELETE" }
  );

  if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: ApiResponse<any> = await response.json();

  if (!result.isSucess) {
    throw new Error(result.customMessage || "Delete failed");
  }
};

// ✅ Download file
export const downloadAttachment = async (
  attachmentId: number,
  fileName: string
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/attachments/download/${attachmentId}`,
    { method: "GET" }
  );

  if (!response.ok) throw new Error(`Download failed: ${response.status}`);

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
