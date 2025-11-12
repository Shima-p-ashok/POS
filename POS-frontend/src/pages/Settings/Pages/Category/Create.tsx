// src/pages/Settings/Category/CategoryCreate.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import KiduCreate from "../../../../components/KiduCreate"; 
import KiduNote from "../../../../components/KiduNote"; 

const categoryFields = [
  { name: "categoryName", label: "Category Name", type: "text", required: true },
  { name: "code", label: "Code", type: "number", required: true },
];

const CategoryCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: Record<string, unknown>) => {
    try {
      setLoading(true);
      const res = await CategoryService.create(data); 

      Swal.fire({
        title: "Success!",
        text: res?.message || "Category created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      navigate("/category");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error instanceof Error ? error.message : "Failed to create category.",
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
          title="Create Category"
          fields={categoryFields}
          onSubmit={handleCreate}
          loading={loading}
          submitText="Create"
        >
          <KiduNote message="You can add attachments after creating the category." />
        </KiduCreate>
      </div>
    </div>
  );
};

export default CategoryCreate;
