// ProductView.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductService from "../../../../services/SettingsServices/ProductService";
import type { Product } from "../../../../types/SettingsTypes/Product.types";
import KiduView from "../../../../components/KiduView";

const productFields: { key: keyof Product; label: string }[] = [
  { key: "productId", label: "Product ID" },
  { key: "productName", label: "Product Name" },
  { key: "companyId", label: "Company" },
  { key: "categoryId", label: "Category" },
  { key: "sku", label: "SKU" },
  { key: "price", label: "Price" },
  { key: "unit", label: "Unit" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created At" },
];

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await ProductService.getById(Number(id));
        if (res?.isSuccess && res?.value) {
          setData(res.value);
        } else {
          Swal.fire({ icon: "error", title: "Error", text: res?.message || "Failed to fetch product details." });
        }
      } catch (err: unknown) {
        Swal.fire({ icon: "error", title: "Error", text: err instanceof Error ? err.message : "Error fetching product details." });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!data?.productId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the product as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await ProductService.delete(data.productId);
          if (res?.isSuccess) {
            Swal.fire("Deleted!", "Product deleted successfully.", "success");
            navigate("/product");
          } else {
            Swal.fire("Error", res?.message || "Delete failed.", "error");
          }
        } catch (err: unknown) {
          Swal.fire("Error", err instanceof Error ? err.message : "Delete error.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduView<Product>
        title="Product Details"
        data={data}
        fields={productFields}
        loading={loading}
        onEdit={() => navigate(`/product-edit/${data?.productId}`)}
        onDelete={handleDelete}
        formatDate={formatDate}
        smallReadOnlyFields={["productId"]}
        tableName="Product"
        recordId={data?.productId}
      />
    </div>
  );
};

export default ProductView;
