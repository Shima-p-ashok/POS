import Company, { ICompany } from "../../Types/SettingsTypes/Company.types";

// ✅ Create Company (auto-generate incremental companyId)
export const createCompanyService = async (data: Partial<ICompany>) => {
  const lastCompany = await Company.findOne().sort({ companyId: -1 });
  const nextId = lastCompany ? lastCompany.companyId + 1 : 1;

  const newCompany = new Company({
    ...data,
    companyId: nextId,
  });

  return await newCompany.save();
};

// ✅ Get All Companies
export const getAllCompaniesService = async () => {
  return await Company.find();
};

// ✅ Get Company by companyId
export const getCompanyByIdService = async (id: string | number) => {
  return await Company.findOne({ companyId: Number(id) });
};

// ✅ Update Company by companyId
export const updateCompanyService = async (
  id: string | number,
  data: Partial<ICompany>
) => {
  return await Company.findOneAndUpdate(
    { companyId: Number(id) },
    data,
    { new: true }
  );
};

// ✅ Delete Company by companyId
export const deleteCompanyService = async (id: string | number) => {
  return await Company.findOneAndDelete({ companyId: Number(id) });
};
