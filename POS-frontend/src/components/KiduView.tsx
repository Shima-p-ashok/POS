// src/components/KiduView.tsx
import React from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

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

  return (
    <Container
      className="p-4 mt-3 shadow-sm rounded"
      style={{ backgroundColor: "white", fontFamily: "Urbanist" }}
    >
      {/* Header */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h4 className="fw-bold mb-0">{title}</h4>
        </Col>
        <Col className="text-end">
          {onEdit && (
            <Button
              className="me-2"
              style={{
                backgroundColor: "#3085d6",
                border: "none",
                fontWeight: 500,
              }}
              onClick={onEdit}
            >
              <FaEdit className="me-1" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="danger" onClick={onDelete} disabled={loading}>
              {loading ? <Spinner size="sm" /> : <FaTrash className="me-1" />}
              Delete
            </Button>
          )}
        </Col>
      </Row>

      {/* Details Table */}
      <div className="table-responsive">
        <Table bordered hover responsive className="align-middle mb-0">
          <tbody>
            {fields.map(({ key, label }) => {
              let value: React.ReactNode = data[key] ?? "-";

              // Optional formatting for date fields
              if (
                (String(key).toLowerCase().includes("date") ||
                  key === "createdAt") &&
                typeof data[key] === "string"
              ) {
                value = formatDate ? formatDate(data[key]) : data[key];
              }

              // Boolean handling
              if (typeof data[key] === "boolean") {
                value = data[key] ? "Yes" : "No";
              }

              return (
                <tr key={String(key)}>
                  <td className="fw-semibold">{label}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default KiduView;
