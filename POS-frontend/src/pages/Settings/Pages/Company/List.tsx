import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../../../components/KiduTable";
import KiduPrevious from "../../../../components/KiduPrevious";
import CompanyService from "../../../../services/SettingsServices/CompanyService";
import type { Company } from "../../../../types/SettingsTypes/Company.types";

const columns = [
  { key: "companyId", label: "Company ID", type: "number", required: true },
  { key: "companyName", label: "Name", type: "text", required: true },
  { key: "email", label: "Email", type: "text" },
  { key: "contactNumber", label: "Number", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "country", label: "Country", type: "text" },
];

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await CompanyService.getAll();
        console.log("Company API Response:", res);

        if (res.isSuccess && Array.isArray(res.value)) {
          setCompanies(res.value);
        } else {
          console.error("Failed to fetch companies:", res.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        Loading companies...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduTable
        columns={columns}
        data={companies}
        addButtonLabel="Add New Company"
        idKey="companyId"
        viewRoute="/company-view/:id"
        editRoute="/company-edit/:id"
      />
    </div>
  );
};

export default CompanyList;
