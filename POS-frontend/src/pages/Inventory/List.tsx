import React, { useEffect, useState } from "react";
import KiduTable from "../../components/KiduTable";
import KiduPrevious from "../../components/KiduPrevious";
import InventoryService from "../../services/InventoryService";
import type { Inventory } from "../../types/Inventory.types";
import { Spinner } from "react-bootstrap";

const columns = [
  { key: "itemId", label: "Item ID" },
  { key: "itemName", label: "Item Name" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "unit", label: "Unit" },
  { key: "stockQty", label: "Stock Qty" },
  { key: "purchaseRate", label: "Purchase Rate" },
  { key: "saleRate", label: "Sale Rate" },
  { key: "taxPercent", label: "Tax %" },
];

const InventoryList: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await InventoryService.getAll();
        console.log("Inventory API Response:", res);

        if (res.isSuccess && res.value) {
          setInventory(res.value);
        } else {
          console.error("Failed to fetch inventory:", res.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading inventory...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduTable
        title="Inventory Records"
        columns={columns}
        data={inventory}
        addButtonLabel="Add New Item"
        viewRoute="/inventory-view/:id"
        editRoute="/inventory-edit/:id"
      />
    </div>
  );
};

export default InventoryList;
