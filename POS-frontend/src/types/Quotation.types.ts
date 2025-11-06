
export interface Quotation {
  quotationId: string;        // Unique ID for the quotation
  customerName: string;       // Customer name
  totalAmount: string;        // Total quotation amount (can be number if preferred)
  validUntil: string;         // Validity date of the quotation
  date: string;               // Date when the quotation was issued
  items?: QuotationItem[];    // Optional: list of items in the quotation
  createdAt?: string;         // Optional: timestamp of creation
  updatedAt?: string;         // Optional: timestamp of last update
}

// individual items in a quotation
export interface QuotationItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: string;   
  totalPrice: string;  
}
