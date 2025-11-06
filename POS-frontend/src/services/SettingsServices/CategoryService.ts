import HttpService from "../Common/HttpService";
import type { CustomResponse } from "../../types/Common/ApiTypes";
import type { Category } from "../../types/SettingsTypes/Category.types";
import { API_ENDPOINTS } from "../../constants/API_ENDPOINTS";

class CategoryService {
  static async getAll(): Promise<CustomResponse<Category[]>> {
    return HttpService.callApi(API_ENDPOINTS.CATEGORY.GET_ALL, "GET");
  }

  static async getById(id: number): Promise<CustomResponse<Category>> {
    return HttpService.callApi(API_ENDPOINTS.CATEGORY.GET_BY_ID(id), "GET");
  }

  static async create(data: Category): Promise<CustomResponse<Category>> {
    return HttpService.callApi(API_ENDPOINTS.CATEGORY.CREATE, "POST", data);
  }

  static async update(id: number, data: Category): Promise<CustomResponse<Category>> {
    return HttpService.callApi(API_ENDPOINTS.CATEGORY.UPDATE(id), "PUT", data);
  }

  static async delete(id: number): Promise<CustomResponse<null>> {
    return HttpService.callApi(API_ENDPOINTS.CATEGORY.DELETE(id), "DELETE");
  }
}

export default CategoryService;
