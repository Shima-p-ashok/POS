import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../../services/SettingsServices/ProductService";
import KiduCreateAndEdit from "../../../../components/KiduCreateAndEdit";
import KiduPrevious from "../../../../components/KiduPrevious";
import type { Product } from "../../../../types/SettingsTypes/Product.types";

const productFields = [
  { name: "productName", label: "Product Name", type: "text", required: true },
  { name: "companyId", label: "Company", type: "popup", required: true },
  { name: "categoryId", label: "Category", type: "popup", required: true },
  { name: "sku", label: "SKU", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "unit", label: "Unit", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
];

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await ProductService.create(data as Product);

      Swal.fire({
        title: "Success!",
        text: res.message || "Product created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      navigate("/product");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create product.";
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f3f3f3",
      }}
    >
      <KiduPrevious />
      <KiduCreateAndEdit
        title="Create Product"
        fields={productFields}
        onSubmit={handleCreate}
        loading={loading}
      />
    </div>
  );
};

export default ProductCreate;
