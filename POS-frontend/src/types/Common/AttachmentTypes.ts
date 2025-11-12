// src/types/Common/AttachmentTypes.ts

export interface Attachment {
  attachmentId: number;
  tableName: string;
  recordId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: string;
  updatedAt?: string;
  
}
