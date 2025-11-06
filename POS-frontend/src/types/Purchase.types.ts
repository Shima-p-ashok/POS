export interface Purchase {
  purchaseId: string;        // Unique ID for the purchase
  supplierName: string;      // Name of the supplier
  totalAmount: string;       // Total purchase amount 
  paymentMode: "Cash" | "Card" | "UPI" | string; // Payment mode
  date: string;              // Purchase date 
  items?: PurchaseItem[];    // Optional: list of items in the purchase
  createdAt?: string;        // Optional: record created timestamp
  updatedAt?: string;        // Optional: record updated timestamp
}

// items in a purchase
export interface PurchaseItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: string;   
  totalPrice: string;  
}