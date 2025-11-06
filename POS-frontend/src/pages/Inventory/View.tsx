import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InventoryService from "../../services/InventoryService";
import type { Inventory } from "../../types/Inventory.types";
import KiduPrevious from "../../components/KiduPrevious";
import KiduView from "../../components/KiduView";

const inventoryFields: { key: keyof Inventory; label: string }[] = [
  { key: "itemId", label: "Item ID" },
  { key: "itemName", label: "Item Name" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "unit", label: "Unit" },
  { key: "stockQty", label: "Stock Quantity" },
  { key: "purchaseRate", label: "Purchase Rate" },
  { key: "saleRate", label: "Sale Rate" },
  { key: "taxPercent", label: "Tax Percent (%)" },
  { key: "barcode", label: "Barcode" },
  { key: "description", label: "Description" },
  { key: "createdAt", label: "Created At" },
  { key: "isActive", label: "Active" },
];

const InventoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await InventoryService.getById(Number(id));
        if (res?.isSuccess && res?.value) {
          setData(res.value);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.message || "Failed to fetch item details.",
          });
        }
      } catch (err: unknown) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err instanceof Error ? err.message : "Error fetching item details.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!data?.itemId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the item as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await InventoryService.delete(data.itemId);
          if (res?.isSuccess) {
            Swal.fire("Deleted!", "Item deleted.", "success");
            navigate("/inventory");
          } else {
            Swal.fire("Error", res?.message || "Delete failed.", "error");
          }
        } catch (err: unknown) {
          Swal.fire("Error", err instanceof Error ? err.message : "Delete error.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduView<Inventory>
        title="Inventory Item Details"
        data={data}
        fields={inventoryFields}
        loading={loading}
        onEdit={() => navigate(`/inventory-edit/${data?.itemId}`)}
        onDelete={handleDelete}
        formatDate={formatDate}
      />
    </div>
  );
};

export default InventoryView;
