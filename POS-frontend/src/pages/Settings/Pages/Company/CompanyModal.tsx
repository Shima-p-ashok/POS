// ============================================
// CompanyModal.tsx
// ============================================
import React from "react";
import KiduCreateModal from "../../../../components/KiduCreateModal";
import { API_ENDPOINTS } from "../../../../constants/API_ENDPOINTS";
import type { Company } from "../../../../types/SettingsTypes/Company.types";

const companyFields: {
  name: keyof Company;
  label: string;
  type: "text" | "number" | "textarea";
  required?: boolean;
}[] = [
  { name: "companyId", label: "Company ID", type: "number", required: true },
  { name: "companyName", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "text" },
  { name: "contactNumber", label: "Number", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "country", label: "Country", type: "text" },
];

interface CompanyCreateModalProps {
  show: boolean;
  handleClose: () => void;
  onAdded: (newItem: Company) => void;
}

const CompanyCreateModal: React.FC<CompanyCreateModalProps> = ({
  show,
  handleClose,
  onAdded,
}) => {
  return (
    <KiduCreateModal<Company>
      show={show}
      handleClose={handleClose}
      title="Create Company"
      fields={companyFields}
      endpoint={API_ENDPOINTS.COMPANY.CREATE}
      onCreated={onAdded}
    />
  );
};

export default CompanyCreateModal;
