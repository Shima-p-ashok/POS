// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import InventoryService from "../../services/InventoryService";
// import KiduCreateAndEdit from "../../components/KiduCreateAndEdit";
// import KiduPrevious from "../../components/KiduPrevious";
// import type { Inventory } from "../../types/Inventory.types";

// const inventoryFields = [
//   { name: "itemId", label: "Item ID", type: "text", required: true },
//   { name: "itemName", label: "Item Name", type: "text", required: true },
//   { name: "category", label: "Category", type: "text", required: true },
//   { name: "brand", label: "Brand", type: "text", required: false },
//   { name: "unit", label: "Unit", type: "text", required: true },
//   { name: "stockQty", label: "Stock Quantity", type: "number", required: true },
//   { name: "purchaseRate", label: "Purchase Rate", type: "number", required: true },
//   { name: "saleRate", label: "Sale Rate", type: "number", required: true },
//   { name: "taxPercent", label: "Tax Percent (%)", type: "number", required: true },
//   { name: "barcode", label: "Barcode", type: "text", required: false },
//   { name: "description", label: "Description", type: "textarea", required: false },
// ];

// const InventoryCreate: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleCreate = async (data: Record<string, any>) => {
//     try {
//       setLoading(true);
//       const res = await InventoryService.create(data as Inventory);
//       Swal.fire({
//         title: "Success!",
//         text: res.message || "Item created successfully.",
//         icon: "success",
//         confirmButtonColor: "#3B82F6",
//       });
//       navigate("/inventory");
//     } catch (error: unknown) {
//       const message =
//         error instanceof Error ? error.message : "Failed to create item.";
//       Swal.fire({
//         title: "Error!",
//         text: message,
//         icon: "error",
//         confirmButtonColor: "#EF4444",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
//       <KiduPrevious />
//       <KiduCreateAndEdit
//         title="Create Inventory Item"
//         fields={inventoryFields}
//         onSubmit={handleCreate}
//         loading={loading}
//       />
//     </div>
//   );
// };

// export default InventoryCreate;
