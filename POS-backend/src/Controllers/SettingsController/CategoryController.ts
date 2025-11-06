import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from "../../Services/SettingsServices/CategoryServices";
import { ResponseHandler } from "../../utils/ResponseHandler";

// ✅ Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await createCategoryService(req.body);
    return ResponseHandler.success(res, newCategory, "Category created successfully", 201);
  } catch (error) {
    return ResponseHandler.error(res, error, "Error creating category", 400);
  }
};

// ✅ Get All Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();
    return ResponseHandler.success(res, categories, "Categories fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching categories");
  }
};

// ✅ Get Category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing category ID", 400);

    const category = await getCategoryByIdService(id);
    if (!category)
      return ResponseHandler.error(res, null, "Category not found", 404);

    return ResponseHandler.success(res, category, "Category fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching category");
  }
};

// ✅ Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing category ID", 400);

    const updated = await updateCategoryService(id, req.body);
    if (!updated)
      return ResponseHandler.error(res, null, "Category not found", 404);

    return ResponseHandler.success(res, updated, "Category updated successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error updating category", 400);
  }
};

// ✅ Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing category ID", 400);

    const deleted = await deleteCategoryService(id);
    if (!deleted)
      return ResponseHandler.error(res, null, "Category not found", 404);

    return ResponseHandler.success(res, deleted, "Category deleted successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error deleting category");
  }
};
