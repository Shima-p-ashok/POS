import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CompanyService from "../../../../services/SettingsServices/CompanyService";
import type { Company } from "../../../../types/SettingsTypes/Company.types";
import KiduPrevious from "../../../../components/KiduPrevious";
import KiduView from "../../../../components/KiduView";

const companyFields: { key: keyof Company; label: string }[] = [
  { key: "companyId", label: "Company ID" },
  { key: "companyName", label: "Company Name" },
  { key: "website", label: "Website" },
  { key: "contactNumber", label: "Contact Number" },
  { key: "email", label: "Email" },
  { key: "taxNumber", label: "Tax Number" },
  { key: "addressLine1", label: "Address Line 1" },
  { key: "addressLine2", label: "Address Line 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
  { key: "zipCode", label: "ZIP Code" },
  { key: "invoicePrefix", label: "Invoice Prefix" },
  { key: "companyLogo", label: "Company Logo" },
  { key: "isActive", label: "Active" },
  { key: "isDeleted", label: "Deleted" },
  { key: "createdAt", label: "Created At" },
];

const CompanyView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Company | null>(null);
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
    const fetchCompany = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await CompanyService.getById(Number(id));
        console.log("Company by ID Response:", res);

        if (res?.isSuccess && res?.value) {
          setData(res.value);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.message || "Failed to fetch company details.",
          });
        }
      } catch (err: unknown) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err instanceof Error
              ? err.message
              : "Error fetching company details.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleDelete = async () => {
    if (!data?.companyId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the company as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await CompanyService.delete(data.companyId);
          if (res?.isSuccess) {
            Swal.fire("Deleted!", "Company deleted successfully.", "success");
            navigate("/company");
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
      <KiduView<Company>
        title="Company Details"
        data={data}
        fields={companyFields}
        loading={loading}
        onEdit={() => navigate(`/company-edit/${data?.companyId}`)}
        onDelete={handleDelete}
        formatDate={formatDate}
      />
    </div>
  );
};

export default CompanyView;
