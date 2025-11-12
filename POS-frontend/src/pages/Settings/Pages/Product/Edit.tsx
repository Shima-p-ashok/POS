// ProductEdit.tsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../../../services/SettingsServices/ProductService";
import KiduEdit from "../../../../components/KiduEdit";
import KiduAttachments from "../../../../components/KiduAttachments";
import KiduAuditLog from "../../../../components/KiduAuditLogs";
import type { Product } from "../../../../types/SettingsTypes/Product.types";

const productFields = [
  { name: "productId", label: "Product ID", type: "number", readOnly: true },
  { name: "productName", label: "Product Name", type: "text", required: true },
  { name: "companyId", label: "Company", type: "popup", required: true },
  { name: "categoryId", label: "Category", type: "popup", required: true },
  { name: "sku", label: "SKU", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "unit", label: "Unit", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
];

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) throw new Error("Product ID not found in URL");
        const res = await ProductService.getById(Number(id));
        if (res.isSuccess) {
          setProduct(res.value);
        } else {
          throw new Error(res.message || "Failed to load product data");
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to fetch details.";
        Swal.fire("Error", message, "error");
        navigate("/product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleUpdate = async (data: Partial<Record<string, unknown>>) => {
    try {
      if (!id) throw new Error("Product ID missing");
      setLoading(true);
      const res = await ProductService.update(Number(id), data);
      Swal.fire({
        title: "Success!",
        text: res.message || "Product updated successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
      navigate("/product");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update product.";
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

  if (loading) return <p className="text-center mt-5">Loading product details...</p>;
  if (!product) return <p className="text-center mt-5">Product not found.</p>;

  const recordId = product.productId;

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#ffffff" }}>
      <KiduEdit
        key={recordId}
        title="Edit Product"
        fields={productFields}
        initialData={product as unknown as Record<string, string | number | boolean>}
        onSubmit={handleUpdate}
        loading={loading}
      />

      {recordId && (
        <>
          <div className="mt-4">
            <KiduAttachments tableName="Product" recordId={recordId} />
          </div>

          <div className="mt-4">
            <KiduAuditLog tableName="Product" recordId={recordId} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductEdit;
