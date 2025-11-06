// src/Services/CustomerService.ts
import Customer, { ICustomer } from "../Types/Customer.types";

// ✅ Create Customer (auto-generate incremental customerId)
export const createCustomerService = async (data: Partial<ICustomer>) => {
  const lastCustomer = await Customer.findOne().sort({ customerId: -1 });
  const nextId = lastCustomer ? lastCustomer.customerId + 1 : 1;

  const newCustomer = new Customer({
    ...data,
    customerId: nextId,
  });

  return await newCustomer.save();
};

// ✅ Get All Customers
export const getAllCustomersService = async () => {
  return await Customer.find();
};

// ✅ Get Customer by customerId
export const getCustomerByIdService = async (id: string) => {
  return await Customer.findOne({ customerId: Number(id) });
};

// ✅ Update Customer using customerId 
export const updateCustomerService = async (id: string, data: Partial<ICustomer>) => {
  return await Customer.findOneAndUpdate(
    { customerId: Number(id) }, // use numeric customerId
    data,
    { new: true }
  );
};

// ✅ Soft Delete Customer (mark inactive)
export const deleteCustomerService = async (id: string | number) => {
  return await Customer.findOneAndDelete({ customerId: Number(id) });
};

