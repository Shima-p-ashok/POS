import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../components/KiduTable";
import KiduPrevious from "../../components/KiduPrevious";
import CustomerService from "../../services/CustomerService";
import type { Customer } from "../../types/Customer.types";

const columns = [
  { key: "customerId", label: "Customer ID" },
  { key: "customerName", label: "Customer Name" },
  { key: "contactPerson", label: "Contact Person" },
  { key: "phoneNo", label: "Phone No" },
  { key: "email", label: "Email" },
  { key: "gstNumber", label: "GST / Tax No" },
];

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await CustomerService.getAll();
        if (res.isSuccess && Array.isArray(res.value)) {
          setCustomers(res.value);
        }
      } catch (err) {
        console.error(err);
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
      {/* Header Row */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        {/* Back Button */}
        <KiduPrevious />

        {/* Title and Subtitle */}
        <div className="flex-grow-1 px-3">
          <h4 className="mb-1 fw-bold" style={{ fontFamily: "Urbanist" }}>
            Customer Records
          </h4>
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            Manage customer details — view, edit, or add new entries
          </p>
        </div>
      </div>

      {/* Customer Table */}
      <KiduTable
        columns={columns}
        data={customers}
        showActions={true}
        idKey="customerId"
        showSearch={true}
        addButtonLabel="Add New Customer"
        isServerSide= {false}
        onAddClick={() => console.log("Add Customer Clicked")}
        viewRoute="/customers-view/:id"
        editRoute="/customers-edit/:id"
      />

    </div>
  );
};

export default CustomerList;
