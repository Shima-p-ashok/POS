import React from "react";
import POSTable from "../../components/KiduTable";
import KiduPrevious from "../../components/KiduPrevious";

const columns = [
  { key: "quotationId", label: "Quotation ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "validUntil", label: "Valid Until" },
  { key: "date", label: "Date Issued" },
];

const QuotationList: React.FC = () => {
  const quotationData = [
    {
      quotationId: "QUO001",
      customerName: "John Doe",
      totalAmount: "₹4,500",
      validUntil: "2025-11-01",
      date: "2025-10-21",
    },
    {
      quotationId: "QUO002",
      customerName: "Mary Smith",
      totalAmount: "₹2,800",
      validUntil: "2025-10-30",
      date: "2025-10-20",
    },
    {
      quotationId: "QUO003",
      customerName: "Arjun Mehta",
      totalAmount: "₹6,200",
      validUntil: "2025-11-05",
      date: "2025-10-19",
    },
  ];

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px"}}>
      <KiduPrevious/>
      <POSTable
        title="Quotation Records"
        columns={columns}
        data={quotationData}
        addButtonLabel="Add New Quotation"
        viewRoute="/quotation-view"
        editRoute="/quotation-edit"
      />
    </div>
  );
};

export default QuotationList;
