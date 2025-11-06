import { Request, Response } from "express";
import {
  createInventoryService,
  getAllInventoryService,
  getInventoryByItemIdService,
  updateInventoryService,
  deleteInventoryService,
} from "../Services/InventoryServices";
import { ResponseHandler } from "../utils/ResponseHandler";

// ✅ Create Item
export const createInventory = async (req: Request, res: Response) => {
  try {
    const newItem = await createInventoryService(req.body);
    return ResponseHandler.success(res, newItem, "Item created successfully", 201);
  } catch (error) {
    return ResponseHandler.error(res, error, "Error creating item", 400);
  }
};

// ✅ Get All Items
export const getInventories = async (req: Request, res: Response) => {
  try {
    const items = await getAllInventoryService();
    return ResponseHandler.success(res, items, "Items fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching items");
  }
};

// ✅ Get Item by itemId
export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await getInventoryByItemIdService(Number(id));
    if (!item) return ResponseHandler.error(res, null, "Item not found", 404);

    return ResponseHandler.success(res, item, "Item fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching item");
  }
};

// ✅ Update Item by itemId
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updateInventoryService(Number(id), req.body);
    if (!updated) return ResponseHandler.error(res, null, "Item not found", 404);

    return ResponseHandler.success(res, updated, "Item updated successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error updating item");
  }
};

// ✅ Soft Delete Item by itemId
export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteInventoryService(Number(id));
    if (!deleted) return ResponseHandler.error(res, null, "Item not found", 404);

    return ResponseHandler.success(res, deleted, "Item deleted successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error deleting item");
  }
};
