import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../../../components/KiduTable";
import KiduPrevious from "../../../../components/KiduPrevious";
import CategoryService from "../../../../services/SettingsServices/CategoryService";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const columns = [
    { key: "categoryId", label: "Category ID", type: "number", required: true },
    { key: "categoryName", label: "Category Name", type: "text", required: true },
    { key: "code", label: "Code", type: "number", required: true },
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
                <Spinner animation="border" />
                Loading categories...
            </div>
        );
    }

    return (
        <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
            <KiduPrevious />
            <KiduTable
                title="Category Records"
                columns={columns}
                data={categories}
                addButtonLabel="Add New Category"
                idKey="categoryId"
                viewRoute="/category-view/:id"
                editRoute="/category-edit/:id"
            />

        </div>
    );
};

export default CategoryList;
