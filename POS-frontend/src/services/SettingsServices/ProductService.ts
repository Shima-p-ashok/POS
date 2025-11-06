import HttpService from "../Common/HttpService";
import type { CustomResponse } from "../../types/Common/ApiTypes";
import type { Product } from "../../types/SettingsTypes/Product.types";
import { API_ENDPOINTS } from "../../constants/API_ENDPOINTS";

class ProductService {
  // ✅ Get all products
  static async getAll(): Promise<CustomResponse<Product[]>> {
    return HttpService.callApi(API_ENDPOINTS.PRODUCT.GET_ALL, "GET");
  }

  // ✅ Get a product by ID
  static async getById(id: number): Promise<CustomResponse<Product>> {
    return HttpService.callApi(API_ENDPOINTS.PRODUCT.GET_BY_ID(id), "GET");
  }

  // ✅ Create a new product
  static async create(data: Product): Promise<CustomResponse<Product>> {
    return HttpService.callApi(API_ENDPOINTS.PRODUCT.CREATE, "POST", data);
  }

  // ✅ Update an existing product
  static async update(id: number, data: Product): Promise<CustomResponse<Product>> {
    return HttpService.callApi(API_ENDPOINTS.PRODUCT.UPDATE(id), "PUT", data);
  }

  // ✅ Delete a product
  static async delete(id: number): Promise<CustomResponse<null>> {
    return HttpService.callApi(API_ENDPOINTS.PRODUCT.DELETE(id), "DELETE");
  }
}

export default ProductService;
