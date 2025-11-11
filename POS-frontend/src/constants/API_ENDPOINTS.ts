const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API_BASE_URL1 = 'http://sreenathganga-001-site13.jtempurl.com/api';

export const API_ENDPOINTS = {
  CUSTOMER: {
    GET_ALL: `${API_BASE_URL}/customers`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/customers/${id}`,
    CREATE: `${API_BASE_URL}/customers`,
    UPDATE: (id: number) => `${API_BASE_URL}/customers/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/customers/${id}`,
  },

  CATEGORY: {
    GET_ALL: `${API_BASE_URL}/categories`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/categories/${id}`,
    CREATE: `${API_BASE_URL}/categories`,
    UPDATE: (id: number) => `${API_BASE_URL}/categories/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/categories/${id}`,
  },

  INVENTORY: {
    GET_ALL: `${API_BASE_URL}/inventories`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/inventories/${id}`,
    CREATE: `${API_BASE_URL}/inventories`,
    UPDATE: (id: number) => `${API_BASE_URL}/inventories/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/inventories/${id}`,
  },

  COMPANY: {
    GET_ALL: `${API_BASE_URL}/companies`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/companies/${id}`,
    CREATE: `${API_BASE_URL}/companies`,
    UPDATE: (id: number) => `${API_BASE_URL}/companies/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/companies/${id}`,
  },

  PRODUCT: {
    GET_ALL: `${API_BASE_URL}/products`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/products/${id}`,
    CREATE: `${API_BASE_URL}/products`,
    UPDATE: (id: number) => `${API_BASE_URL}/products/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/products/${id}`,
  },

  MANUFACTURER: {
    GET_ALL: `${API_BASE_URL}/manufacturers`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/manufacturers/${id}`,
    CREATE: `${API_BASE_URL}/manufacturers`,
    UPDATE: (id: number) => `${API_BASE_URL}/manufacturers/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/manufacturers/${id}`,
  },

 ATTACHMENT: {
    GET_BY_TABLE_AND_RECORD: (tableName: string, recordId: number | string) =>
      `${API_BASE_URL1}/Attachment/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`,
    GET_BY_ID: (id: number) => `${API_BASE_URL1}/Attachment/${id}`,
    UPLOAD: `${API_BASE_URL1}/Attachment/upload`,
    DELETE: (id: number, deletedBy: string) =>
      `${API_BASE_URL1}/Attachment/${id}?deletedBy=${encodeURIComponent(deletedBy)}`,
    DOWNLOAD: (id: number) => `${API_BASE_URL1}/Attachment/download/${id}`,
  },

  AUDIT_LOG: {
    GET_BY_RECORD: (tableName: string, recordId: number | string) =>
      `${API_BASE_URL1}/AuditLog/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`,
    GET_BY_ID: (logID: string) =>
      `${API_BASE_URL1}/AuditLog/${encodeURIComponent(logID)}`,
  },


};
