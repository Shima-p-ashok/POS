export interface Product {
  productId: number;
  productName: string;
  categoryId: number;
  categoryName?: string;
  brand?: string;
  description?: string;
  unit?: string;
  sku?: string;
  barcode?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  stockQuantity?: number;
  taxRate?: number;
  imageUrl?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}


