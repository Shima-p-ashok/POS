export interface CustomResponse<T> {
  statusCode: number;
  error?: string | null;
  customMessage?: string | null;
  isSuccess: boolean;
  message?: string;
  value: T;
}
