export interface Inventory {
  itemId: number;
  itemName: string;
  category: string;
  brand: string;
  unit: string;
  stockQty: number;
  purchaseRate: number;
  saleRate: number;
  taxPercent: number;
  barcode?: string;
  description?: string;
  createdAt: string;
  isActive: boolean;
}
