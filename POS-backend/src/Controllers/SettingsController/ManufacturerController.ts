import { Request, Response } from "express";
import {
  createManufacturerService,
  getAllManufacturersService,
  getManufacturerByIdService,
  updateManufacturerService,
  deleteManufacturerService,
} from "../../Services/SettingsServices/ManufacturerServices";
import { ResponseHandler } from "../../utils/ResponseHandler";

// ✅ Create Manufacturer
export const createManufacturer = async (req: Request, res: Response) => {
  try {
    const newManufacturer = await createManufacturerService(req.body);
    return ResponseHandler.success(
      res,
      newManufacturer,
      "Manufacturer created successfully",
      201
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error creating Manufacturer", 400);
  }
};

// ✅ Get All Manufacturers
export const getManufacturers = async (req: Request, res: Response) => {
  try {
    const manufacturers = await getAllManufacturersService();
    return ResponseHandler.success(
      res,
      manufacturers,
      "Manufacturers fetched successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching Manufacturers");
  }
};

// ✅ Get Manufacturer by ID
export const getManufacturerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Manufacturer ID", 400);

    const manufacturer = await getManufacturerByIdService(id);
    if (!manufacturer)
      return ResponseHandler.error(res, null, "Manufacturer not found", 404);

    return ResponseHandler.success(
      res,
      manufacturer,
      "Manufacturer fetched successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching Manufacturer");
  }
};

// ✅ Update Manufacturer
export const updateManufacturer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Manufacturer ID", 400);

    const updated = await updateManufacturerService(id, req.body);
    if (!updated)
      return ResponseHandler.error(res, null, "Manufacturer not found", 404);

    return ResponseHandler.success(
      res,
      updated,
      "Manufacturer updated successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error updating Manufacturer", 400);
  }
};

// ✅ Delete Manufacturer
export const deleteManufacturer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Manufacturer ID", 400);

    const deleted = await deleteManufacturerService(id);
    if (!deleted)
      return ResponseHandler.error(res, null, "Manufacturer not found", 404);

    return ResponseHandler.success(
      res,
      deleted,
      "Manufacturer deleted successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error deleting Manufacturer");
  }
};
