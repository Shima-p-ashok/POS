import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import KiduCreateAndEdit from "../../../../components/KiduCreateAndEdit";
import KiduPrevious from "../../../../components/KiduPrevious";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const categoryFields = [
  { name: "categoryName", label: "Category Name", type: "text", required: true },
  { name: "code", label: "Code", type: "number", required: true },
];

const CategoryCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await CategoryService.create(data as Category);
      Swal.fire({
        title: "Success!",
        text: res.message || "Category created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
      navigate("/category"); 
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create category.";
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
        title="Create Category"
        fields={categoryFields}
        onSubmit={handleCreate}
        loading={loading}
      />
    </div>
  );
};

export default CategoryCreate;
