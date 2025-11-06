import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ManufacturerService from "../../../../services/SettingsServices/ManufacturerService";
import type { Manufacturer } from "../../../../types/SettingsTypes/Manufacturer.types";
import KiduPrevious from "../../../../components/KiduPrevious";
import KiduView from "../../../../components/KiduView";

const manufacturerFields: { key: keyof Manufacturer; label: string }[] = [
  { key: "manufacturerId", label: "Manufacturer ID" },
  { key: "manufacturerName", label: "Manufacturer Name" },
  { key: "description", label: "Description" },
  { key: "categoryName", label: "Category Name" },
  { key: "productName", label: "Product Name" },
  { key: "contactNumber", label: "Contact Number" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" },
  { key: "postalCode", label: "Postal Code" },
  { key: "website", label: "Website" },
  { key: "isActive", label: "Active" },
  { key: "isDeleted", label: "Deleted" },
  { key: "createdAt", label: "Created At" },
];

const ManufacturerView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Manufacturer | null>(null);
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
    const fetchManufacturer = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await ManufacturerService.getById(Number(id));
        console.log("Manufacturer by ID Response:", res);

        if (res?.isSuccess && res?.value) {
          setData(res.value);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.message || "Failed to fetch manufacturer details.",
          });
        }
      } catch (err: unknown) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err instanceof Error
              ? err.message
              : "Error fetching manufacturer details.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchManufacturer();
  }, [id]);

  const handleDelete = async () => {
    if (!data?.manufacturerId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "This will mark the manufacturer as inactive.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await ManufacturerService.delete(data.manufacturerId);
          if (res?.isSuccess) {
            Swal.fire("Deleted!", "Manufacturer deleted successfully.", "success");
            navigate("/manufacturer");
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
      <KiduView<Manufacturer>
        title="Manufacturer Details"
        data={data}
        fields={manufacturerFields}
        loading={loading}
        onEdit={() => navigate(`/manufacturer-edit/${data?.manufacturerId}`)}
        onDelete={handleDelete}
        formatDate={formatDate}
      />
    </div>
  );
};

export default ManufacturerView;
