import type { AuditLogResponse } from "../../types/Common/AuditLogTypes";
import { API_ENDPOINTS } from "../../constants/API_ENDPOINTS";
import HttpService from "./HttpService";

class AuditLogService {
  /** ✅ Fetch audit logs by table and record */
  static async getByRecord(tableName: string, recordId: number): Promise<AuditLogResponse> {
    const response = await HttpService.callApi(
      API_ENDPOINTS.AUDIT_LOG.GET_BY_RECORD(tableName, recordId),
      "GET"
    );
    return response as AuditLogResponse;
  }

  /** ✅ Fetch single audit log entry by logID */
  static async getById(logID: string): Promise<AuditLogResponse> {
    const response = await HttpService.callApi(
      API_ENDPOINTS.AUDIT_LOG.GET_BY_ID(logID),
      "GET"
    );
    return response as AuditLogResponse;
  }
}

export default AuditLogService;
