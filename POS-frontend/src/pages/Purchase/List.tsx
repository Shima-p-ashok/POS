import React from "react";
import POSTable from "../../components/KiduTable";
import KiduPrevious from "../../components/KiduPrevious";

const columns = [
  { key: "purchaseId", label: "Purchase ID" },
  { key: "supplierName", label: "Supplier Name" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "paymentMode", label: "Payment Mode" },
  { key: "date", label: "Date" },
];

const PurchaseList: React.FC = () => {
  //  Dummy purchase data
  const purchaseData = [
    {
      purchaseId: "PUR001",
      supplierName: "ABC Supplies",
      totalAmount: "₹3,500",
      paymentMode: "Cash",
      date: "2025-10-21",
    },
    {
      purchaseId: "PUR002",
      supplierName: "XYZ Traders",
      totalAmount: "₹7,200",
      paymentMode: "UPI",
      date: "2025-10-20",
    },
    {
      purchaseId: "PUR003",
      supplierName: "LMN Enterprises",
      totalAmount: "₹1,980",
      paymentMode: "Card",
      date: "2025-10-19",
    },
  ];

  return (
    <div className="bg-light"  style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious/>
      <POSTable
        title="Purchase Records"
        columns={columns}
        data={purchaseData}
        addButtonLabel="Add New Purchase"
        viewRoute="/purchase-view"
        editRoute="/purchase-edit"
      />
    </div>
  );
};

export default PurchaseList;
