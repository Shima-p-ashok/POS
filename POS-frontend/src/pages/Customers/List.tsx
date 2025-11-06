import React, { useEffect, useState } from "react";
import KiduTable from "../../components/KiduTable";
import KiduPrevious from "../../components/KiduPrevious";
import CustomerService from "../../services/CustomerService";
import type { Customer } from "../../types/Customer.types";
import { Spinner } from "react-bootstrap";

const columns = [
  { key: "customerId", label: "Customer ID", type: "number", required: true },
  { key: "customerName", label: "Customer Name", type: "text", required: true },
  { key: "contactPerson", label: "Contact Person", type: "text", required: true },
  { key: "phoneNo", label: "Phone No", type: "text", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "website", label: "Website", type: "text" },
  { key: "address", label: "Address", type: "textarea", required: true },
  { key: "gstNumber", label: "GST / Tax No", type: "number" },
];

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await CustomerService.getAll();
        console.log("Customer API Response:", res);

        if (res.isSuccess && Array.isArray(res.value)) {
          setCustomers(res.value);
        } else {
          console.error("Failed to fetch customers:", res.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading customers...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduTable
        title="Customer Records"
        columns={columns}
        data={customers}
        addButtonLabel="Add New Customer"
        idKey="customerId"
        viewRoute="/customers-view/:id"
        editRoute="/customers-edit/:id"
      />

    </div>
  );
};

export default CustomerList;
