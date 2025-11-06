// A common API response structure (like CustomApiResponse in C#)
export interface ApiResponse {
  isSuccess: boolean;
  statusCode: number;
  message?: string;
  value?: any;
  error?: any;
}

export const ResponseHandler = {
  success: (res: any, data: any, message = "Success", statusCode = 200) => {
    const response: ApiResponse = {
      isSuccess: true,
      statusCode,
      message,
      value: data,
    };
    return res.status(statusCode).json(response);
  },

  error: (res: any, error: any, message = "Error", statusCode = 500) => {
    const response: ApiResponse = {
      isSuccess: false,
      statusCode,
      message,
      error: error instanceof Error ? error.message : error,
    };
    return res.status(statusCode).json(response);
  },
};
