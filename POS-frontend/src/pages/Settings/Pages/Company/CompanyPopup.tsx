// ============================================
// CompanyPopup.tsx
// ============================================
import React from "react";
import KiduPopup from "../../../../components/KiduPopup";
import { API_ENDPOINTS } from "../../../../constants/API_ENDPOINTS";
import type { Company } from "../../../../types/SettingsTypes/Company.types";
import CompanyCreateModal from "../../../../pages/Settings/Pages/Company/CompanyModal";

const CompanyPopup: React.FC<{
  show: boolean;
  handleClose: () => void;
  onSelect: (company: Company) => void;
}> = (props) => {
  return (
    <KiduPopup<Company>
      {...props}
      title="Select Company"
      fetchEndpoint={API_ENDPOINTS.COMPANY.GET_ALL}
      columns={[
        { key: "companyId", label: "Company ID" },
        { key: "companyName", label: "Name" },
        { key: "email", label: "Email" },
        { key: "contactNumber", label: "Number" },
        { key: "city", label: "City" },
        { key: "country", label: "Country" },
      ]}
      searchKeys={[
        "companyName",
        "email",
        "contactNumber",
        "city",
        "country",
      ]}
      AddModalComponent={CompanyCreateModal}
    />
  );
};

export default CompanyPopup;
