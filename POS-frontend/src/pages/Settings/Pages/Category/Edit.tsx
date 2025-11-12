// src/pages/Settings/Category/CategoryEdit.tsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import KiduEdit from "../../../../components/KiduEdit";
import KiduAttachments from "../../../../components/KiduAttachments";
import KiduAuditLog from "../../../../components/KiduAuditLogs";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const categoryFields = [
  { name: "categoryId", label: "Category ID", type: "number", readOnly: true },
  { name: "categoryName", label: "Category Name", type: "text", required: true },
  { name: "code", label: "Code", type: "number", required: true },
];

const CategoryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch category details by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!id) throw new Error("Category ID not found in URL");
        const res = await CategoryService.getById(Number(id));
        if (res.isSuccess) {
          setCategory(res.value);
        } else {
          throw new Error(res.message || "Failed to load category data");
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch details.";
        Swal.fire("Error", message, "error");
        navigate("/categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, navigate]);

  // ✅ Update category handler
  const handleUpdate = async (data: Partial<Category>) => {
    try {
      if (!id) throw new Error("Category ID missing");
      setLoading(true);
      const res = await CategoryService.update(Number(id), data as Category);
      Swal.fire({
        title: "Success!",
        text: res.message || "Category updated successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
      navigate("/categories");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update category.";
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

  // ✅ Conditional rendering
  if (loading) return <p className="text-center mt-5">Loading category details...</p>;
  if (!category) return <p className="text-center mt-5">Category not found.</p>;

  const recordId = category.categoryId;

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#ffffff" }}>
      {/* Go Back Button */}

      {/* Edit Form */}
      <KiduEdit
        key={recordId}
        title="Edit Category"
        fields={categoryFields}
        initialData={category as unknown as Record<string, string | number | boolean>}
        onSubmit={handleUpdate}
        loading={loading}
      />

      {/* Attachments & Audit Log */}
      {recordId && (
        <>
          <div className="mt-4">
            <KiduAttachments tableName="Category" recordId={recordId} />
          </div>

          <div className="mt-4">
            <KiduAuditLog tableName="Category" recordId={recordId} />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryEdit;
