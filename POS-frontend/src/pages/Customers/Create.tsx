import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import KiduCreateAndEdit from "../../components/KiduCreateAndEdit";
import KiduPrevious from "../../components/KiduPrevious";
import type { Customer } from "../../types/Customer.types";

const customerFields = [
  { name: "customerName", label: "Customer Name", type: "text", required: true },
  { name: "contactPerson", label: "Contact Person", type: "text", required: true },
  { name: "phoneNo", label: "Phone No", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "website", label: "Website", type: "text" },
  { name: "address", label: "Address", type: "textarea", required: true },
  { name: "gstNumber", label: "GST / Tax No", type: "number" },
];

const CustomerCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await CustomerService.create(data as Customer);
      Swal.fire({
        title: "Success!",
        text: res.message || "Customer created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
      navigate("/customers");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create customer.";
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
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
      <KiduPrevious />
      <KiduCreateAndEdit
        title="Create Customer"
        fields={customerFields}
        onSubmit={handleCreate}
        loading={loading}
      />
    </div>
  );
};

export default CustomerCreate;
