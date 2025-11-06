// Represents a single sales transaction
export interface Sale {
  invoiceId: string;        // Unique invoice ID
  customerName: string;     // Customer name
  totalAmount: string;      // Total amount of sale
  paymentMode: "Cash" | "Card" | "UPI" | string; // Payment method
  date: string;             // Date of sale
  items?: SaleItem[];       // Optional: items sold
  createdAt?: string;       // Optional: timestamp of creation
}

// represents individual items in a sale
export interface SaleItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: string;  
  totalPrice: string;
}