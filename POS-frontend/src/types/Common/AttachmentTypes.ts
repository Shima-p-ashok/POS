// src/types/Common/AttachmentTypes.ts

export interface Attachment {
  attachmentId: number;
  attachmentType: string;       // ".png", ".jpg", etc. (backend field)
  attachmentPath: string;       // full path from backend
  description: string;
  filePath: string;
  fileName: string;
  fileType: string;
  tableName: string;
  recordID: number;             // matches backend field
  uploadedBy: string;
  uploaddedOn: string;          // matches backend field (typo in backend)
  updatedOn?: string;           // optional, if backend returns updated timestamp
  isDeleted: boolean;
  deletedOn: string | null;
  deletedBy: string;
}
