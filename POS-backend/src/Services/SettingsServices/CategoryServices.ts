import Category, { ICategory } from "../../Types/SettingsTypes/Category.types";

// ✅ Create Category (auto-generate incremental categoryId)
export const createCategoryService = async (data: Partial<ICategory>) => {
  const lastCategory = await Category.findOne().sort({ categoryId: -1 });
  const nextId = lastCategory ? lastCategory.categoryId + 1 : 1;

  const newCategory = new Category({
    ...data,
    categoryId: nextId,
  });

  return await newCategory.save();
};

// ✅ Get All Categories
export const getAllCategoriesService = async () => {
  return await Category.find();
};

// ✅ Get Category by categoryId
export const getCategoryByIdService = async (id: string) => {
  return await Category.findOne({ categoryId: Number(id) });
};

// ✅ Update Category using categoryId
export const updateCategoryService = async (id: string, data: Partial<ICategory>) => {
  return await Category.findOneAndUpdate(
    { categoryId: Number(id) },
    data,
    { new: true }
  );
};

// ✅ Delete Category (remove permanently)
export const deleteCategoryService = async (id: string | number) => {
  return await Category.findOneAndDelete({ categoryId: Number(id) });
};
