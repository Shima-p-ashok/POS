import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../../../components/KiduTable";
import KiduPrevious from "../../../../components/KiduPrevious";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const columns = [
  { key: "categoryId", label: "Category ID" },
  { key: "categoryName", label: "Category Name" },
  { key: "code", label: "Code" },
];

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAll();
        console.log("Category API Response:", res);

        if (res.isSuccess && Array.isArray(res.value)) {
          setCategories(res.value);
        } else {
          console.error("Failed to fetch categories:", res.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading categories...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      {/* Header Row */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        {/* Back Button */}
        <KiduPrevious />

        {/* Title and Subtitle */}
        <div className="flex-grow-1 px-3">
          <h4 className="mb-1 fw-bold" style={{ fontFamily: "Urbanist" }}>
            Category Records
          </h4>
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            Manage category details — view, edit, or add new entries
          </p>
        </div>
      </div>

      {/* Category Table */}
      <KiduTable
        columns={columns}
        data={categories}
        showActions={true}
        idKey="categoryId"
        showSearch={true}
        addButtonLabel="Add New Category"
        isServerSide={false}
        onAddClick={() => console.log("Add Category Clicked")}
        viewRoute="/category-view/:id"
        editRoute="/category-edit/:id"
      />
    </div>
  );
};

export default CategoryList;
