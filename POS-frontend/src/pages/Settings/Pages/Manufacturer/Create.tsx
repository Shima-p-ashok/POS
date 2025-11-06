import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ManufacturerService from "../../../../services/SettingsServices/ManufacturerService";
import KiduCreateAndEdit from "../../../../components/KiduCreateAndEdit";
import KiduPrevious from "../../../../components/KiduPrevious";
import KiduPopup from "../../../../components/KiduPopup";
import { API_ENDPOINTS } from "../../../../constants/API_ENDPOINTS";
import type { Manufacturer } from "../../../../types/SettingsTypes/Manufacturer.types";
import type { Category } from "../../../../types/SettingsTypes/Category.types";
import type { Product } from "../../../../types/SettingsTypes/Product.types";

const ManufacturerCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    manufacturerName: "",
    description: "",
    categoryId: "",
    categoryName: "",
    productId: "",
    productName: "",
    contactNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    website: "",
  });

  // Popup visibility states
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);

  // Form fields configuration
  const manufacturerFields = [
    { 
      name: "manufacturerName", 
      label: "Manufacturer Name", 
      type: "text", 
      required: true,
      placeholder: "Enter manufacturer name"
    },
    { 
      name: "description", 
      label: "Description", 
      type: "text", 
      as: "textarea" as const,
      placeholder: "Enter description"
    },
    { 
      name: "categoryName", 
      label: "Category", 
      type: "text",
      placeholder: "Select category",
      popup: { onOpen: () => setShowCategoryPopup(true) }
    },
    { 
      name: "productName", 
      label: "Product", 
      type: "text",
      placeholder: "Select product",
      popup: { onOpen: () => setShowProductPopup(true) }
    },
    { 
      name: "contactNumber", 
      label: "Contact Number", 
      type: "text",
      placeholder: "Enter contact number"
    },
    { 
      name: "email", 
      label: "Email", 
      type: "email",
      placeholder: "Enter email address"
    },
    { 
      name: "address", 
      label: "Address", 
      type: "text",
      placeholder: "Enter address"
    },
    { 
      name: "city", 
      label: "City", 
      type: "text",
      placeholder: "Enter city"
    },
    { 
      name: "state", 
      label: "State", 
      type: "text",
      placeholder: "Enter state"
    },
    { 
      name: "country", 
      label: "Country", 
      type: "text",
      placeholder: "Enter country"
    },
    { 
      name: "postalCode", 
      label: "Postal Code", 
      type: "text",
      placeholder: "Enter postal code"
    },
    { 
      name: "website", 
      label: "Website", 
      type: "text",
      placeholder: "Enter website URL"
    },
  ];

  // Handle category selection
  const handleSelectCategory = (item: Category) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: String(item.categoryId),
      categoryName: item.categoryName,
    }));
  };

  // Handle product selection
  const handleSelectProduct = (item: Product) => {
    setFormData((prev) => ({
      ...prev,
      productId: String(item.productId),
      productName: item.productName,
    }));
  };

  // Submit handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await ManufacturerService.create(data as Manufacturer);

      Swal.fire({
        title: "Success!",
        text: res.message || "Manufacturer created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      navigate("/manufacturer");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create manufacturer.";
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

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f3f3f3",
      }}
    >
      <KiduPrevious />
      
      <KiduCreateAndEdit
        title="Create Manufacturer"
        fields={manufacturerFields}
        onSubmit={handleCreate}
        loading={loading}
        initialData={formData}
      />

      {/* Category Popup */}
      <KiduPopup<Category>
        show={showCategoryPopup}
        handleClose={() => setShowCategoryPopup(false)}
        apiEndpoint={API_ENDPOINTS.CATEGORY.GET_ALL}
        title="Select Category"
        columns={[
          { key: "categoryId", label: "ID" },
          { key: "categoryName", label: "Category Name" },
          { key: "code", label: "Code" },
        ]}
        searchKeys={["categoryName", "code"]}
        onSelect={handleSelectCategory}
      />

      {/* Product Popup */}
      <KiduPopup<Product>
        show={showProductPopup}
        handleClose={() => setShowProductPopup(false)}
        apiEndpoint={API_ENDPOINTS.PRODUCT.GET_ALL}
        title="Select Product"
        columns={[
          { key: "productId", label: "ID" },
          { key: "productName", label: "Product Name" },
          { key: "categoryName", label: "Category" },
          { key: "brand", label: "Brand" },
        ]}
        searchKeys={["productName", "categoryName", "brand"]}
        onSelect={handleSelectProduct}
      />
    </div>
  );
};

export default ManufacturerCreate;