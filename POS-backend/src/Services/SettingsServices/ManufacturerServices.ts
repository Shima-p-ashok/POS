// src/Services/SettingsServices/ManufacturerService.ts
import Manufacturer, { IManufacturer } from "../../Types/SettingsTypes/Manufacturer.types";

// ✅ Create Manufacturer (auto-generate incremental manufacturerId)
export const createManufacturerService = async (data: Partial<IManufacturer>) => {
  const lastManufacturer = await Manufacturer.findOne().sort({ manufacturerId: -1 });
  const nextId = lastManufacturer ? lastManufacturer.manufacturerId + 1 : 1;

  const newManufacturer = new Manufacturer({
    ...data,
    manufacturerId: nextId,
  });

  return await newManufacturer.save();
};

// ✅ Get All Manufacturers
export const getAllManufacturersService = async () => {
  return await Manufacturer.find();
};

// ✅ Get Manufacturer by manufacturerId
export const getManufacturerByIdService = async (id: string | number) => {
  return await Manufacturer.findOne({ manufacturerId: Number(id) });
};

// ✅ Update Manufacturer by manufacturerId
export const updateManufacturerService = async (
  id: string | number,
  data: Partial<IManufacturer>
) => {
  return await Manufacturer.findOneAndUpdate(
    { manufacturerId: Number(id) },
    data,
    { new: true }
  );
};

// ✅ Delete Manufacturer by manufacturerId
export const deleteManufacturerService = async (id: string | number) => {
  return await Manufacturer.findOneAndDelete({ manufacturerId: Number(id) });
};
