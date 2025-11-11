import React from "react";
import { Table, Button, Spinner, Card } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import KiduPrevious from "./KiduPrevious";

interface Field<T> {
  key: keyof T;
  label: string;
}

interface KiduViewProps<T> {
  title: string;
  data: T | null;
  fields: Field<T>[];
  loading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  formatDate?: (dateStr?: string) => string;
  smallReadOnlyFields?: (keyof T)[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function KiduView<T extends Record<string, any>>({
  title,
  data,
  fields,
  loading = false,
  onEdit,
  onDelete,
  formatDate,
  smallReadOnlyFields = [],
}: KiduViewProps<T>) {
  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!data)
    return (
      <div className="text-center mt-5">
        <h5 className="text-muted">No details found.</h5>
      </div>
    );

  // === Detect common "name" and "id" fields ===
  const nameKey = (Object.keys(data).find(k =>
    ["name", "customerName", "fullName"].includes(k)
  ) || "") as keyof T;

  const idKey = (Object.keys(data).find(k =>
    ["id", "customerId", "userId"].includes(k)
  ) || "") as keyof T;

  return (
    <Card className="mx-2 my-3 shadow-sm rounded-3">
      {/* === Header === */}
      <Card.Header
        className="d-flex align-items-center justify-content-between"
        style={{ backgroundColor: "#3B82F6", color: "white", padding: "0.25rem 0.75rem" }}
      >
        <div className="d-flex align-items-center gap-3">
          <KiduPrevious />
          <h5 className="mb-0 fw-bold">{title}</h5>
        </div>

        <div className="d-flex align-items-center gap-2">
          {onEdit && (
            <Button
              className="d-flex align-items-center gap-1"
              style={{
                backgroundColor: "#ffffffff",
                color: "#3B82F6",
                border: "none",
                fontWeight: 500,
              }}
              onClick={onEdit}
            >
              <FaEdit size={15} /> Edit
            </Button>
          )}
          {onDelete && (
            <Button
              className="d-flex align-items-center gap-1"
              style={{
                backgroundColor: "#EF4444",
                border: "none",
                fontWeight: 500,
                color: "white",
              }}
              onClick={onDelete}
            >
              <FaTrash size={15} /> Delete
            </Button>
          )}
        </div>
      </Card.Header>

      {/* === Body === */}
      <Card.Body style={{ backgroundColor: "#fff", padding: "2rem", fontFamily: "Urbanist" }}>
        {/* === Centered name + ID === */}
        <div className="text-center mb-4">
          <h5 className="fw-bold mb-1" >
            {data[nameKey] || "-"}
          </h5>
          {idKey && (
            <div  style={{color: "#ff1d1dff", fontSize: "0.9rem" }}>
              <strong>ID :</strong>{" "}
              <span style={{ color: "#ff1d1dff", fontWeight: 600 }}>
                {data[idKey] || "-"}
              </span>
            </div>
          )}
        </div>

        {/* === Table === */}
        <div className="table-responsive">
          <Table bordered hover responsive className="align-middle mb-0">
            <tbody>
              {fields
                .filter(f => !smallReadOnlyFields.includes(f.key))
                .map(({ key, label }) => {
                  let value: React.ReactNode = data[key] ?? "-";

                  if (
                    (String(key).toLowerCase().includes("date") || key === "createdAt") &&
                    typeof data[key] === "string"
                  ) {
                    value = formatDate ? formatDate(data[key]) : data[key];
                  }

                  if (typeof data[key] === "boolean") {
                    value = data[key] ? "Yes" : "No";
                  }

                  return (
                    <tr key={String(key)}>
                      <td style={{ width: "40%", color: "#000000ff", fontWeight: 800 }}>
                        {label}
                      </td>
                      <td style={{ color: "#000" }}>{value}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default KiduView;
