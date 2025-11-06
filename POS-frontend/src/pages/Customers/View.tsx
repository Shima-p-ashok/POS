// src/pages/Customers/CustomerView.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomerService from "../../services/CustomerService";
import type { Customer } from "../../types/Customer.types";
import KiduPrevious from "../../components/KiduPrevious";
import KiduView from "../../components/KiduView";

const customerFields: { key: keyof Customer; label: string }[] = [
  { key: "customerId", label: "Customer ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "contactPerson", label: "Contact Person" },
  { key: "phoneNo", label: "Phone No" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
  { key: "address", label: "Address" },
  { key: "gstNumber", label: "GST / Tax No" },
  { key: "createdAt", label: "Created At" },
  { key: "isActive", label: "Active" },
];

const CustomerView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Customer | null>(null);
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
    const fetchCustomer = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await CustomerService.getById(Number(id));
        console.log("Customer by ID Response:", res);

        if (res?.isSuccess && res?.value) {
          setData(res.value);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.message || "Failed to fetch customer details.",
          });
        }
      } catch (err: unknown) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err instanceof Error
              ? err.message
              : "Error fetching customer details.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    if (!data?.customerId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the customer as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await CustomerService.delete(data.customerId);
          if (res?.isSuccess) {
            Swal.fire("Deleted!", "Customer deleted successfully.", "success");
            navigate("/customers");
          } else {
            Swal.fire("Error", res?.message || "Delete failed.", "error");
          }
        } catch (err: unknown) {
          Swal.fire(
            "Error",
            err instanceof Error ? err.message : "Delete error.",
            "error"
          );
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduView<Customer>
        title="Customer Details"
        data={data}
        fields={customerFields}
        loading={loading}
        onEdit={() => navigate(`/customers-edit/${data?.customerId}`)}
        onDelete={handleDelete}
        formatDate={formatDate}
      />
    </div>
  );
};

export default CustomerView;
