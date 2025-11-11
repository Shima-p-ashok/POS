// CustomerCreate.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import KiduCreateAndEdit from "../../components/KiduCreateAndEdit";
import KiduNote from "../../components/KiduNote";

const customerFields = [
  { name: "customerName", label: "Customer Name", type: "text", required: true },
  { name: "contactPerson", label: "Contact Person", type: "text", required: true },
  { name: "phoneNo", label: "Phone No", type: "number", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "website", label: "Website", type: "text", required: true },
  { name: "address", label: "Address", type: "text", as: "textarea" as const, required: true },
  { name: "gstNumber", label: "GST / Tax No", type: "text", required: true },
];

const CustomerCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data: Record<string, unknown>) => {
    try {
      setLoading(true);
      const res = await CustomerService.create(data);

      Swal.fire({
        title: "Success!",
        text: res?.message || "Customer created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      navigate("/customers");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error instanceof Error ? error.message : "Failed to create customer.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <div className="mx-2">
        <KiduCreateAndEdit
          title="Create Customer"
          fields={customerFields}
          onSubmit={handleCreate}
          loading={loading}
        >
          <KiduNote message="You can add attachments after creating the customer." />
        </KiduCreateAndEdit>
      </div>
    </div>
  );
};

export default CustomerCreate;