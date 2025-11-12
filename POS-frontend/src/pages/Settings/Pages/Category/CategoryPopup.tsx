// src/pages/Settings/Category/CategoryPopup.tsx
import React from "react";
import KiduPopup from "../../../../components/KiduPopup";
import { API_ENDPOINTS } from "../../../../constants/API_ENDPOINTS";
import type { Category } from "../../../../types/SettingsTypes/Category.types";
import CategoryCreateModal from "../../../../pages/Settings/Pages/Category/CategoryModal";

const CategoryPopup: React.FC<{
  show: boolean;
  handleClose: () => void;
  onSelect: (category: Category) => void;
}> = (props) => {
  return (
    <KiduPopup<Category>
      {...props}
      title="Select Category"
      fetchEndpoint={API_ENDPOINTS.CATEGORY.GET_ALL}
      columns={[
        { key: "categoryId", label: "Category ID" },
        { key: "categoryName", label: "Category Name" },
        { key: "code", label: "Code" },
      ]}
      searchKeys={["categoryName", "code"]}
      AddModalComponent={CategoryCreateModal} 
    />
  );
};

export default CategoryPopup;
