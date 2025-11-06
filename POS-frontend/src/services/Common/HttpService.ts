// src/services/HttpService.ts
export class HttpService {
  static async callApi<T, D extends object | FormData = object>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    data?: D,
    isPublic: boolean = false,
    isFormData: boolean = false
  ): Promise<T> {
    const token = localStorage.getItem('jwt_token');
    const headers: Record<string, string> = {};
    
    // Set Content-Type header if not sending FormData
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    // Add Authorization header if not a public route
    if (!isPublic && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make API call
    const response = await fetch(endpoint, {
      method,
      headers,
      body: method !== 'GET' ? (isFormData ? data as FormData : JSON.stringify(data)) : undefined,
    });

    if (response.status === 401) {
      throw new Error('Unauthorized access. Please log in again.');
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${response.status} - ${errorMessage}`);
    }

    return response.json();
  }
}

export default HttpService;
