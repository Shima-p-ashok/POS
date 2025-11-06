import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import ManufacturerService from "../../../../services/SettingsServices/ManufacturerService";
import KiduCreateAndEdit from "../../../../components/KiduCreateAndEdit";
import KiduPrevious from "../../../../components/KiduPrevious";
import type { Manufacturer } from "../../../../types/SettingsTypes/Manufacturer.types";

const manufacturerFields = [
  { name: "manufacturerId", label: "Manufacturer ID", type: "text", required: true, readOnly: true },
  { name: "manufacturerName", label: "Manufacturer Name", type: "text", required: true },
  { name: "description", label: "Description", type: "text" },
  { name: "categoryName", label: "Category Name", type: "text" },
  { name: "productName", label: "Product Name", type: "text" },
  { name: "contactNumber", label: "Contact Number", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "address", label: "Address", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "postalCode", label: "Postal Code", type: "text" },
  { name: "website", label: "Website", type: "text" },
];

const ManufacturerEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState<Manufacturer | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch manufacturer by ID
  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        if (!id) throw new Error("Manufacturer ID not found in URL");
        const res = await ManufacturerService.getById(Number(id));
        if (res.isSuccess) setManufacturer(res.value);
        else throw new Error(res.message || "Failed to load manufacturer data");
      } catch (error: unknown) {
        Swal.fire("Error", (error as Error).message, "error");
        navigate("/manufacturer");
      } finally {
        setLoading(false);
      }
    };
    fetchManufacturer();
  }, [id, navigate]);

  // ✅ Update handler
  const handleUpdate = async (data: Partial<Manufacturer>) => {
    try {
      if (!id) throw new Error("Manufacturer ID missing");
      setLoading(true);
      const res = await ManufacturerService.update(Number(id), data as Manufacturer);
      Swal.fire("Success", res.message || "Manufacturer updated successfully!", "success");
      navigate("/manufacturer");
    } catch (error: unknown) {
      Swal.fire("Error", (error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!manufacturer) return <p className="text-center mt-4">Manufacturer not found.</p>;

  // ✅ Provide default (non-editable) ID
  const initialData = { ...manufacturer, manufacturerId: manufacturer.manufacturerId.toString() };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f3f3f3" }}>
      <KiduPrevious />
      <KiduCreateAndEdit
        key={manufacturer.manufacturerId}
        title="Edit Manufacturer"
        fields={manufacturerFields}
        initialData={initialData as Record<string, string | number | boolean>}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
};

export default ManufacturerEdit;
