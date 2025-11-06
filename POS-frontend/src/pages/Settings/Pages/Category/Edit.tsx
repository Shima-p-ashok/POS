import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import KiduCreateAndEdit from "../../../../components/KiduCreateAndEdit";
import KiduPrevious from "../../../../components/KiduPrevious";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const categoryFields = [
  { name: "categoryId", label: "Category ID", type: "number", required: true },
  { name: "categoryName", label: "Category Name", type: "text", required: true },
  { name: "code", label: "Code", type: "number", required: true },
];

const CategoryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!id) throw new Error("Category ID not found in URL");
        const res = await CategoryService.getById(Number(id));
        console.log("Fetched category:", res);
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

  // ✅ Update handler
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
      navigate("/category");
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

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  if (!category) return <p className="text-center mt-4">Category not found.</p>;

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
      <KiduPrevious />
      <KiduCreateAndEdit
        key={category.categoryId} // ✅ forces re-render when data changes
        title="Category"
        fields={categoryFields}
        initialData={category as unknown as Record<string, string | number | boolean>}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
};

export default CategoryEdit;
