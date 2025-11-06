import { Request, Response } from "express";
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../../Services/SettingsServices/ProductSevices";
import { ResponseHandler } from "../../utils/ResponseHandler";

// ✅ Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await createProductService(req.body);
    return ResponseHandler.success(
      res,
      newProduct,
      "Product created successfully",
      201
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error creating Product", 400);
  }
};

// ✅ Get All Products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    return ResponseHandler.success(
      res,
      products,
      "Products fetched successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching Products");
  }
};

// ✅ Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Product ID", 400);

    const product = await getProductByIdService(id);
    if (!product)
      return ResponseHandler.error(res, null, "Product not found", 404);

    return ResponseHandler.success(res, product, "Product fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching Product");
  }
};

// ✅ Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Product ID", 400);

    const updated = await updateProductService(id, req.body);
    if (!updated)
      return ResponseHandler.error(res, null, "Product not found", 404);

    return ResponseHandler.success(res, updated, "Product updated successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error updating Product", 400);
  }
};

// ✅ Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Product ID", 400);

    const deleted = await deleteProductService(id);
    if (!deleted)
      return ResponseHandler.error(res, null, "Product not found", 404);

    return ResponseHandler.success(res, deleted, "Product deleted successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error deleting Product");
  }
};
