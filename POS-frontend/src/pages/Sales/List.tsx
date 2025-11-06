import React from "react";
import POSTable from "../../components/KiduTable";
import KiduPrevious from "../../components/KiduPrevious";


const columns = [
  { key: "invoiceId", label: "Invoice ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "paymentMode", label: "Payment Mode" },
  { key: "date", label: "Date" },
];

const SalesList: React.FC = () => {
  const salesData = [
    {
      invoiceId: "INV001",
      customerName: "John Doe",
      totalAmount: "₹1,200",
      paymentMode: "Cash",
      date: "2025-10-21",
    },
    {
      invoiceId: "INV002",
      customerName: "Mary Smith",
      totalAmount: "₹2,500",
      paymentMode: "UPI",
      date: "2025-10-20",
    },
    {
      invoiceId: "INV003",
      customerName: "Arjun Mehta",
      totalAmount: "₹980",
      paymentMode: "Card",
      date: "2025-10-19",
    },
  ];

  return (
     <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious/>
      <POSTable
        title="Sales Records"
        columns={columns}
        data={salesData}
        addButtonLabel="Add New Sale"
        viewRoute="/sales-view"
        editRoute="/sales-edit"
      />
    </div>
  );
};

export default SalesList;
