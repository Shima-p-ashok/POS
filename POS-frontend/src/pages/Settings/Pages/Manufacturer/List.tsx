import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import KiduTable from "../../../../components/KiduTable";
import KiduPrevious from "../../../../components/KiduPrevious";
import ManufacturerService from "../../../../services/SettingsServices/ManufacturerService";
import type { Manufacturer } from "../../../../types/SettingsTypes/Manufacturer.types";

const columns = [
  { key: "manufacturerId", label: "Manufacturer ID", type: "number", required: true },
  { key: "manufacturerName", label: "Manufacturer Name", type: "text", required: true },
  { key: "categoryName", label: "Category", type: "text", required: false },
  { key: "productName", label: "Product", type: "text", required: false },
  { key: "contactNumber", label: "Contact Number", type: "text", required: false },
  { key: "email", label: "Email", type: "text", required: false },
  { key: "country", label: "Country", type: "text", required: false },
];

const ManufacturerList: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const res = await ManufacturerService.getAll();
        console.log("Manufacturer API Response:", res);

        if (res.isSuccess && Array.isArray(res.value)) {
          setManufacturers(res.value);
        } else {
          console.error("Failed to fetch manufacturers:", res.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching manufacturers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        Loading manufacturers...
      </div>
    );
  }

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <KiduTable
        title="Manufacturer Records"
        columns={columns}
        data={manufacturers}
        addButtonLabel="Add New Manufacturer"
        idKey="manufacturerId"
        viewRoute="/manufacturer-view/:id"
        editRoute="/manufacturer-edit/:id"
      />
    </div>
  );
};

export default ManufacturerList;
