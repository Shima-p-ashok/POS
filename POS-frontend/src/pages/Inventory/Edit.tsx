// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useParams, useNavigate } from "react-router-dom";
// import InventoryService from "../../services/InventoryService";
// import KiduEdit from "../../components/KiduEdit";
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

// const InventoryEdit: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [initialData, setInitialData] = useState<Inventory | null>(null);

//   useEffect(() => {
//     const fetchItem = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         const res = await InventoryService.getById(Number(id));
//         if (res.isSuccess && res.value) {
//           setInitialData(res.value);
//         } else {
//           Swal.fire("Error", res.message || "Failed to fetch item data.", "error");
//         }
//       } catch (error: unknown) {
//         Swal.fire(
//           "Error",
//           error instanceof Error ? error.message : "Error loading item data.",
//           "error"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItem();
//   }, [id]);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleUpdate = async (data: Record<string, any>) => {
//     try {
//       setLoading(true);
//       const res = await InventoryService.update(Number(id), data as Inventory);
//       if (res.isSuccess) {
//         Swal.fire("Success!", res.message || "Item updated successfully.", "success");
//         navigate("/inventory");
//       } else {
//         Swal.fire("Error", res.message || "Failed to update item.", "error");
//       }
//     } catch (error: unknown) {
//       Swal.fire(
//         "Error!",
//         error instanceof Error ? error.message : "Update failed.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
//       <KiduPrevious />
//       <KiduEdit
//         title="Edit Inventory Item"
//         fields={inventoryFields}
//         onSubmit={handleUpdate}
//         loading={loading}
//         initialData={initialData || {}}
//       />
//     </div>
//   );
// };

// export default InventoryEdit;
