import React from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import KiduButton from "../components/KiduButton";

interface Column {
  key: string;
  label: string;
}

interface KiduTableProps {
  title: string;
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  addButtonLabel?: string;
  showActions?: boolean;
  onAddClick?: () => void;
  viewRoute?: string; // e.g., "/customers-view/:id"
  editRoute?: string; // e.g., "/customers-edit/:id"
  idKey?: string; // ✅ NEW PROP for dynamic ID field (default = "customerId")
}

const KiduTable: React.FC<KiduTableProps> = ({
  title,
  columns,
  data,
  addButtonLabel,
  showActions = true,
  viewRoute,
  editRoute,
  idKey = "customerId", // ✅ default
}) => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-1 mt-3" style={{ fontFamily: "Urbanist" }}>
      {/* Title & Add Button */}
      <Row className="mb-3 ms-3 me-3 align-items-center justify-content-between">
        <Col xs="12" md="6">
          <h4
            className="fw-bold"
            style={{
              WebkitBackgroundClip: "text",
              color: "rgba(0, 0, 0, 1)",
            }}
          >
            {title}
          </h4>
        </Col>
        {addButtonLabel && (
          <Col
            xs="12"
            md="auto"
            className="d-flex justify-content-md-end justify-content-start mt-2 mt-md-0"
          >
            <KiduButton label={addButtonLabel} />
          </Col>
        )}
      </Row>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded-4 bg-white">
        <Table bordered hover responsive className="align-middle mb-0">
          <thead
            style={{
              background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
              color: "white",
            }}
          >
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-uppercase fw-semibold">
                  {col.label}
                </th>
              ))}
              {showActions && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              [...data].reverse().map((item, index) => {
                const recordId = item[idKey]; //dynamically pick ID field
                return (
                  <tr key={index}>
                    {columns.map((col) => (
                      <td key={col.key}>{item[col.key]}</td>
                    ))}
                    {showActions && (
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                          {/* View Button */}
                          <Button
                            size="sm"
                            onClick={() =>
                              viewRoute &&
                              recordId &&
                              navigate(viewRoute.replace(":id", recordId.toString()))
                            }
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid #3B82F6",
                              color: "#3B82F6",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "linear-gradient(90deg, rgba(59,130,246,1))";
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow =
                                "0 4px 10px rgba(59,130,246,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#3B82F6";
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <FaEye className="me-1" /> View
                          </Button>

                          {/* Edit Button */}
                          <Button
                            size="sm"
                            onClick={() => {
                              if (editRoute && recordId) {
                                const target = editRoute.replace(":id", recordId.toString());
                                console.log("Navigating to:", target);
                                navigate(target);
                              }
                            }}
                            style={{
                              background: "linear-gradient(90deg, rgba(59,130,246,1))",
                              border: "none",
                              color: "white",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow =
                                "0 4px 12px rgba(79,70,229,0.4)";
                              e.currentTarget.style.filter = "brightness(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.filter = "brightness(1)";
                            }}
                          >
                            <FaEdit className="me-1" /> Edit
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="text-center py-4 text-muted"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default KiduTable;
