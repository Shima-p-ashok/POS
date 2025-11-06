import { Request, Response } from "express";
import {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
} from "../Services/CustomerService";
import { ResponseHandler } from "../utils/ResponseHandler";

// ✅ Create Customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = await createCustomerService(req.body);
    return ResponseHandler.success(res, newCustomer, "Customer created successfully", 201);
  } catch (error) {
    return ResponseHandler.error(res, error, "Error creating customer", 400);
  }
};

// ✅ Get All Customers
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomersService();
    return ResponseHandler.success(res, customers, "Customers fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching customers");
  }
};

// ✅ Get Customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing customer ID", 400);

    const customer = await getCustomerByIdService(id);
    if (!customer)
      return ResponseHandler.error(res, null, "Customer not found", 404);

    return ResponseHandler.success(res, customer, "Customer fetched successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error fetching customer");
  }
};

// ✅ Update Customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing customer ID", 400);

    const updated = await updateCustomerService(id, req.body);
    if (!updated)
      return ResponseHandler.error(res, null, "Customer not found", 404);

    return ResponseHandler.success(res, updated, "Customer updated successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error updating customer", 400);
  }
};

// ✅ Soft Delete Customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return ResponseHandler.error(res, null, "Missing customer ID", 400);

    const deleted = await deleteCustomerService(id); 
    if (!deleted)
      return ResponseHandler.error(res, null, "Customer not found", 404);

    return ResponseHandler.success(res, deleted, "Customer deleted successfully");
  } catch (error) {
    return ResponseHandler.error(res, error, "Error deleting customer");
  }
};

