import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import KiduCreateAndEdit from "../../components/KiduCreateAndEdit";
import KiduPrevious from "../../components/KiduPrevious";
import KiduAttachments from "../../components/KiduAttachments"; // ✅ import
import type { Customer } from "../../types/Customer.types";

const customerFields = [
  { name: "customerId", label: "Customer ID", type: "number", required: true },
  { name: "customerName", label: "Customer Name", type: "text", required: true },
  { name: "contactPerson", label: "Contact Person", type: "text", required: true },
  { name: "phoneNo", label: "Phone No", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "website", label: "Website", type: "text" },
  { name: "address", label: "Address", type: "textarea", required: true },
  { name: "gstNumber", label: "GST / Tax No", type: "text" },
];

const CustomerEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch customer by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (!id) throw new Error("Customer ID not found in URL");
        const res = await CustomerService.getById(Number(id));
        if (res.isSuccess) {
          setCustomer(res.value);
        } else {
          throw new Error(res.message || "Failed to load customer data");
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch details.";
        Swal.fire("Error", message, "error");
        navigate("/customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id, navigate]);

  // ✅ Update handler
  const handleUpdate = async (data: Partial<Customer>) => {
    try {
      if (!id) throw new Error("Customer ID missing");
      setLoading(true);
      const res = await CustomerService.update(Number(id), data as Customer);
      Swal.fire({
        title: "Success!",
        text: res.message || "Customer updated successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });
      navigate("/customers");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update customer.";
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

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!customer) return <p className="text-center mt-4">Customer not found.</p>;

  const recordId = customer.customerId;

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
      <KiduPrevious />
      <KiduCreateAndEdit
        key={recordId}
        title="Customer"
        fields={customerFields}
        initialData={customer as unknown as Record<string, string | number | boolean>}
        onSubmit={handleUpdate}
        loading={loading}
      />

      {/* ✅ Attachments section */}
      {recordId && (
        <div className="mt-4">
          <KiduAttachments tableName="Customer" recordId={recordId} />
        </div>
      )}
    </div>
  );
};

export default CustomerEdit;
