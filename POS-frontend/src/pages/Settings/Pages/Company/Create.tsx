import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CompanyService from "../../../../services/SettingsServices/CompanyService";
import KiduCreateAndEdit from "../../../../components/KiduCreate";
import KiduPrevious from "../../../../components/KiduPrevious";
import type { Company } from "../../../../types/SettingsTypes/Company.types";

const companyFields = [
  { name: "companyName", label: "Company Name", type: "text", required: true },
  { name: "website", label: "Website", type: "text" },
  { name: "contactNumber", label: "Contact Number", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "taxNumber", label: "Tax Number", type: "text" },
  { name: "addressLine1", label: "Address Line 1", type: "text" },
  { name: "addressLine2", label: "Address Line 2", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "zipCode", label: "ZIP Code", type: "text" },
  { name: "invoicePrefix", label: "Invoice Prefix", type: "text" },
  { name: "companyLogo", label: "Company Logo (URL)", type: "text" },
];

const CompanyCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      const res = await CompanyService.create(data as Company);

      Swal.fire({
        title: "Success!",
        text: res.message || "Company created successfully.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      navigate("/company");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create company.";
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
        title="Create Company"
        fields={companyFields}
        onSubmit={handleCreate}
        loading={loading}
      />
    </div>
  );
};

export default CompanyCreate;
