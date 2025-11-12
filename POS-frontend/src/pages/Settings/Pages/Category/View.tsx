// src/pages/Settings/Category/CategoryView.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import type { Category } from "../../../../types/SettingsTypes/Category.types";
import KiduView from "../../../../components/KiduView";

const categoryFields: { key: keyof Category; label: string }[] = [
  { key: "categoryName", label: "Category Name" },
  { key: "code", label: "Code" },
];

const CategoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  /** ✅ Format date nicely */
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /** ✅ Fetch category details by ID */
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await CategoryService.getById(Number(id));
        console.log("Category by ID Response:", res);

        if (res?.isSuccess && res?.value) {
          setData(res.value);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.message || "Failed to fetch category details.",
            confirmButtonColor: "#EF4444",
          });
        }
      } catch (err: unknown) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err instanceof Error
              ? err.message
              : "Error fetching category details.",
          confirmButtonColor: "#EF4444",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  /** ✅ Handle delete with confirmation */
  const handleDelete = async () => {
    if (!data?.categoryId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the category as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await CategoryService.delete(data.categoryId);
          if (res?.isSuccess) {
            Swal.fire({
              title: "Deleted!",
              text: "Category deleted successfully.",
              icon: "success",
              confirmButtonColor: "#3B82F6",
            });
            navigate("/category");
          } else {
            Swal.fire({
              title: "Error!",
              text: res?.message || "Delete failed.",
              icon: "error",
              confirmButtonColor: "#EF4444",
            });
          }
        } catch (err: unknown) {
          Swal.fire({
            title: "Error!",
            text: err instanceof Error ? err.message : "Delete error.",
            icon: "error",
            confirmButtonColor: "#EF4444",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduView<Category>
        title="Category Details"
        data={data}
        fields={categoryFields}
        loading={loading}
        onEdit={() => navigate(`/category-edit/${data?.categoryId}`)}
        onDelete={handleDelete}
        formatDate={formatDate}
      />
    </div>
  );
};

export default CategoryView;
