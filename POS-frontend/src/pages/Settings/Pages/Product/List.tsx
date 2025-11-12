import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../../../components/KiduTable";
import KiduPrevious from "../../../../components/KiduPrevious";
import ProductService from "../../../../services/SettingsServices/ProductService";
import type { Product } from "../../../../types/SettingsTypes/Product.types";

const columns = [
  { key: "productId", label: "Product ID" },
  { key: "productName", label: "Product Name" },
  { key: "brand", label: "Brand" },
  { key: "categoryName", label: "Category" },
  { key: "sellingPrice", label: "Selling Price" },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAll();
        console.log("📦 Product API Response:", res);

        if (res?.isSuccess && Array.isArray(res.value)) {
          setProducts(res.value);
        } else {
          console.error("❌ Failed to fetch products:", res?.message || "Unknown error");
        }
      } catch (err) {
        console.error("⚠️ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading products...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      {/* 🔙 Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <KiduPrevious />
        <div className="flex-grow-1 px-3">
          <h4 className="mb-1 fw-bold" style={{ fontFamily: "Urbanist" }}>
            Product Records
          </h4>
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            Manage product details — view, edit, or add new entries
          </p>
        </div>
      </div>

      {/* 📊 Product Table */}
      <KiduTable
        columns={columns}
        data={products}
        addButtonLabel="Add New Product"
        showActions
        showSearch
        idKey="productId"
        viewRoute="/product-view/:id"
        editRoute="/product-edit/:id"
        isServerSide={false}
       
      />
    </div>
  );
};

export default ProductList;
