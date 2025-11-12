import React from "react";
import KiduCreateModal from "../../../../components/KiduCreateModal";
import { API_ENDPOINTS } from "../../../../constants/API_ENDPOINTS";
import type { Category } from "../../../../types/SettingsTypes/Category.types";

const categoryFields = [
  { name: "categoryName", label: "Category Name", type: "text", required: true },
  { name: "code", label: "Code", type: "number", required: true },
];

interface CategoryCreateModalProps {
  show: boolean;
  handleClose: () => void;
  onAdded: (newItem: Category) => void;
}

const CategoryCreateModal: React.FC<CategoryCreateModalProps> = ({
  show,
  handleClose,
  onAdded,
}) => {
  return (
    <KiduCreateModal<Category>
      show={show}
      handleClose={handleClose}
      title="Create Category"
      fields={categoryFields}
      endpoint={API_ENDPOINTS.CATEGORY.CREATE}
      onCreated={onAdded}
    />
  );
};

export default CategoryCreateModal;
