const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
};
