import HttpService from "./Common/HttpService";
import type { CustomResponse } from "../types/Common/ApiTypes";
import type { Inventory } from "../types/Inventory.types";
import { API_ENDPOINTS } from "../constants/API_ENDPOINTS";

class InventoryService {
  // ✅ Get all inventory items
  static async getAll(): Promise<CustomResponse<Inventory[]>> {
    return HttpService.callApi(API_ENDPOINTS.INVENTORY.GET_ALL, "GET");
  }

  // ✅ Get one inventory item by ID
  static async getById(id: number): Promise<CustomResponse<Inventory>> {
    return HttpService.callApi(API_ENDPOINTS.INVENTORY.GET_BY_ID(id), "GET");
  }

  // ✅ Create new inventory item
  static async create(data: Inventory): Promise<CustomResponse<Inventory>> {
    return HttpService.callApi(API_ENDPOINTS.INVENTORY.CREATE, "POST", data);
  }

  // ✅ Update existing inventory item
  static async update(id: number, data: Inventory): Promise<CustomResponse<Inventory>> {
    return HttpService.callApi(API_ENDPOINTS.INVENTORY.UPDATE(id), "PUT", data);
  }

  // ✅ Delete inventory item
  static async delete(id: number): Promise<CustomResponse<null>> {
    return HttpService.callApi(API_ENDPOINTS.INVENTORY.DELETE(id), "DELETE");
  }
}

export default InventoryService;
