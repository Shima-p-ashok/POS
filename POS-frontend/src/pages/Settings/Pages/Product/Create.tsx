// src/pages/Settings/Product/ProductCreate.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../../services/SettingsServices/ProductService";
import KiduCreate from "../../../../components/KiduCreate";
import KiduNote from "../../../../components/KiduNote";
import CategoryPopup from "../Category/CategoryPopup";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const productFields = [
  { name: "productName", label: "Product Name", type: "text", required: true },
  { name: "companyId", label: "Company", type: "popup", required: true },
  { name: "categoryId", label: "Category", type: "popup", required: true },
  { name: "sku", label: "SKU", type: "text", required: true },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "unit", label: "Unit", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
];

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCreate = async (data: Record<string, unknown>) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        categoryId: selectedCategory?.categoryId,
      };

      const res = await ProductService.create(payload);

      Swal.fire({
        title: "Success!",
        text: res?.message || "Product created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      navigate("/product");
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err instanceof Error ? err.message : "Failed to create product.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <div className="mx-2">
        <KiduCreate
          title="Create Product"
          fields={productFields}
          onSubmit={handleCreate}
          loading={loading}
          submitText="Create"
          popupHandlers={{
            categoryId: {
              value: selectedCategory?.categoryName || "",
              onOpen: () => setShowCategoryPopup(true),
            },
          }}
        >
          <KiduNote message="You can add attachments or more details after creating the product." />
        </KiduCreate>
      </div>

      <CategoryPopup
        show={showCategoryPopup}
        handleClose={() => setShowCategoryPopup(false)}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setShowCategoryPopup(false);
        }}
      />
    </div>
  );
};

export default ProductCreate;
