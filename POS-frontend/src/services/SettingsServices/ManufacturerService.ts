import HttpService from "../Common/HttpService";
import type { CustomResponse } from "../../types/Common/ApiTypes";
import type { Manufacturer } from "../../types/SettingsTypes/Manufacturer.types";
import { API_ENDPOINTS } from "../../constants/API_ENDPOINTS";

class ManufacturerService {
  // ✅ Get all manufacturers
  static async getAll(): Promise<CustomResponse<Manufacturer[]>> {
    return HttpService.callApi(API_ENDPOINTS.MANUFACTURER.GET_ALL, "GET");
  }

  // ✅ Get a manufacturer by ID
  static async getById(id: number): Promise<CustomResponse<Manufacturer>> {
    return HttpService.callApi(API_ENDPOINTS.MANUFACTURER.GET_BY_ID(id), "GET");
  }

  // ✅ Create a new manufacturer
  static async create(data: Manufacturer): Promise<CustomResponse<Manufacturer>> {
    return HttpService.callApi(API_ENDPOINTS.MANUFACTURER.CREATE, "POST", data);
  }

  // ✅ Update an existing manufacturer
  static async update(
    id: number,
    data: Manufacturer
  ): Promise<CustomResponse<Manufacturer>> {
    return HttpService.callApi(API_ENDPOINTS.MANUFACTURER.UPDATE(id), "PUT", data);
  }

  // ✅ Delete a manufacturer
  static async delete(id: number): Promise<CustomResponse<null>> {
    return HttpService.callApi(API_ENDPOINTS.MANUFACTURER.DELETE(id), "DELETE");
  }
}

export default ManufacturerService;
