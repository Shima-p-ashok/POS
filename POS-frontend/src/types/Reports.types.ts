// Represents a report entry in the POS system
export interface Report {
  reportId: string;        // Unique ID for the report
  reportType: "Sales" | "Purchase" | "Inventory" | "Quotation" | string; // Type of report
  generatedBy: string;     // User who generated the report
  dateGenerated: string;   // Date when the report was generated
  period?: string;         // Optional: period covered by the report, e.g., "Oct 2025"
  totalAmount?: string;    // Optional: total amount covered in the report
  details?: ReportDetail[]; // Optional: individual entries in the report
}

// details of each entry in a report
export interface ReportDetail {
  id: string;              // Could be invoiceId, purchaseId, etc.
  name: string;            // Customer, Supplier, or Item name
  amount: string;          // Amount for this entry
  date: string;            // Date of the entry
}
