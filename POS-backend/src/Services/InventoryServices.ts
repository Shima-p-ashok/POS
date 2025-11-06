import Inventory from "../Types/Inventory.types";

// ✅ Create
export const createInventoryService = async (data: any) => {
  const item = new Inventory(data);
  return await item.save();
};

// ✅ Get all active items
export const getAllInventoryService = async () => {
  return await Inventory.find({ isActive: true });
};

// ✅ Get one by itemId
export const getInventoryByItemIdService = async (itemId: number) => {
  return await Inventory.findOne({ itemId });
};

// ✅ Update by itemId
export const updateInventoryService = async (itemId: number, data: any) => {
  return await Inventory.findOneAndUpdate({ itemId }, data, { new: true });
};

// ✅ Soft delete (set isActive = false)
export const deleteInventoryService = async (itemId: number) => {
  return await Inventory.findOneAndUpdate({ itemId }, { isActive: false }, { new: true });
};
