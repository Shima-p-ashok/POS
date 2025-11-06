import Product, { IProduct } from "../../Types/SettingsTypes/Product.types";

// ✅ Create Product (auto-generate incremental productId)
export const createProductService = async (data: Partial<IProduct>) => {
  const lastProduct = await Product.findOne().sort({ productId: -1 });
  const nextId = lastProduct ? lastProduct.productId + 1 : 1;

  const newProduct = new Product({
    ...data,
    productId: nextId,
  });

  return await newProduct.save();
};

// ✅ Get All Products
export const getAllProductsService = async () => {
  return await Product.find();
};

// ✅ Get Product by productId
export const getProductByIdService = async (id: string | number) => {
  return await Product.findOne({ productId: Number(id) });
};

// ✅ Update Product by productId
export const updateProductService = async (
  id: string | number,
  data: Partial<IProduct>
) => {
  return await Product.findOneAndUpdate(
    { productId: Number(id) },
    data,
    { new: true }
  );
};

// ✅ Delete Product by productId
export const deleteProductService = async (id: string | number) => {
  return await Product.findOneAndDelete({ productId: Number(id) });
};
