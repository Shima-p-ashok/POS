import { Request, Response } from "express";
import {
  createCompanyService,
  getAllCompaniesService,
  getCompanyByIdService,
  updateCompanyService,
  deleteCompanyService,
} from "../../Services/SettingsServices/CompanyServices";
import { ResponseHandler } from "../../utils/ResponseHandler";

// ✅ Create Company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const newCompany = await createCompanyService(req.body);
    return ResponseHandler.success(
      res,
      newCompany,
      "Company created successfully",
      201
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error creating Company", 400);
  }
};

// ✅ Get All Companies
export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await getAllCompaniesService();
    return ResponseHandler.success(
      res,
      companies,
      "Companies fetched successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching Companies");
  }
};

// ✅ Get Company by ID
export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Company ID", 400);

    const company = await getCompanyByIdService(id);
    if (!company)
      return ResponseHandler.error(res, null, "Company not found", 404);

    return ResponseHandler.success(
      res,
      company,
      "Company fetched successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching Company");
  }
};

// ✅ Update Company
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Company ID", 400);

    const updated = await updateCompanyService(id, req.body);
    if (!updated)
      return ResponseHandler.error(res, null, "Company not found", 404);

    return ResponseHandler.success(
      res,
      updated,
      "Company updated successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error updating Company", 400);
  }
};

// ✅ Delete Company
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing Company ID", 400);

    const deleted = await deleteCompanyService(id);
    if (!deleted)
      return ResponseHandler.error(res, null, "Company not found", 404);

    return ResponseHandler.success(
      res,
      deleted,
      "Company deleted successfully"
    );
  } catch (error) {
    return ResponseHandler.error(res, error, "Error deleting Company");
  }
};
