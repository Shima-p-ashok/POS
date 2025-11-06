import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../../../components/KiduTable";
import KiduPrevious from "../../../../components/KiduPrevious";
import ProductService from "../../../../services/SettingsServices/ProductService";
import type { Product } from "../../../../types/SettingsTypes/Product.types";

const columns = [
  { key: "productId", label: "Product ID", type: "number", required: true },
  { key: "productName", label: "Product Name", type: "text", required: true },
  { key: "brand", label: "Brand", type: "text", required: false },
  { key: "categoryName", label: "Category", type: "text", required: false },
  { key: "sellingPrice", label: "Selling Price", type: "number", required: false },
];


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAll();
        console.log("Product API Response:", res);

        if (res.isSuccess && Array.isArray(res.value)) {
          setProducts(res.value);
        } else {
          console.error("Failed to fetch products:", res.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduTable
        title="Product Records"
        columns={columns}
        data={products}
        addButtonLabel="Add New Product"
        idKey="productId"
        viewRoute="/product-view/:id"
        editRoute="/product-edit/:id"
      />
    </div>
  );
};

export default ProductList;
