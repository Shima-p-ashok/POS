import HttpService from "../Common/HttpService";
import type { CustomResponse } from "../../types/Common/ApiTypes";
import type { Company } from "../../types/SettingsTypes/Company.types";
import { API_ENDPOINTS } from "../../constants/API_ENDPOINTS";

class CompanyService {
  // ✅ Get all companies
  static async getAll(): Promise<CustomResponse<Company[]>> {
    return HttpService.callApi(API_ENDPOINTS.COMPANY.GET_ALL, "GET");
  }

  // ✅ Get a company by ID
  static async getById(id: number): Promise<CustomResponse<Company>> {
    return HttpService.callApi(API_ENDPOINTS.COMPANY.GET_BY_ID(id), "GET");
  }

  // ✅ Create a new company
  static async create(data: Company): Promise<CustomResponse<Company>> {
    return HttpService.callApi(API_ENDPOINTS.COMPANY.CREATE, "POST", data);
  }

  // ✅ Update an existing company
  static async update(id: number, data: Company): Promise<CustomResponse<Company>> {
    return HttpService.callApi(API_ENDPOINTS.COMPANY.UPDATE(id), "PUT", data);
  }

  // ✅ Delete a company
  static async delete(id: number): Promise<CustomResponse<null>> {
    return HttpService.callApi(API_ENDPOINTS.COMPANY.DELETE(id), "DELETE");
  }
}

export default CompanyService;
