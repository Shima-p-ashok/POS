import React, { useEffect, useState } from "react";
import { Accordion, Table, Spinner, Alert } from "react-bootstrap";
import AuditLogService from "../services/Common/AuditLogService";
import type { AuditTrails } from "../types/Common/AuditLogTypes";

interface KiduAuditLogProps {
  tableName: string;
  recordId: string | number;
}

const KiduAuditLog: React.FC<KiduAuditLogProps> = ({ tableName, recordId }) => {
  const [history, setHistory] = useState<AuditTrails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tableName && recordId) fetchHistory();
  }, [tableName, recordId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AuditLogService.getByRecord(tableName, Number(recordId));
      console.log("Fetched audit logs:", data);

      if (data.isSucess && Array.isArray(data.value)) {
        setHistory(data.value);
      } else {
        setHistory([]);
        console.warn("Unexpected data format:", data);
      }
    } catch (err) {
      console.error("Error fetching audit logs:", err);
      setError("Failed to load audit logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /** ✅ Action-based color and label */
  const getActionStyle = (action: string) => {
    switch (action.toLowerCase()) {
      case "created":
        return { color: "#16A34A", bg: "#DCFCE7" }; // green
      case "updated":
        return { color: "#CA8A04", bg: "#FEF9C3" }; // yellow
      case "deleted":
        return { color: "#DC2626", bg: "#FEE2E2" }; // red
      default:
        return { color: "#18575A", bg: "#E0F2FE" }; // blue fallback
    }
  };

  return (
    <Accordion className="mt-4 mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h6 className="mb-0 fw-bold" style={{ color: "#18575A" }}>
            Audit Logs
          </h6>
        </Accordion.Header>

        <Accordion.Body className="border border-1 m-2 p-3">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Loading edit history...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : history.length === 0 ? (
            <p className="text-center text-muted mb-0">No edit history available.</p>
          ) : (
            <Accordion alwaysOpen>
              {history.map((log, idx) => {
                const { color, bg } = getActionStyle(log.action);
                const actionLabel =
                  log.action.toLowerCase() === "created"
                    ? `Created by ${log.changedBy} automatically`
                    : `${log.action.charAt(0).toUpperCase() + log.action.slice(1).toLowerCase()} by ${log.changedBy}`;

                return (
                  <Accordion.Item eventKey={idx.toString()} key={log.logID}>
                    <Accordion.Header
                      style={{
                        backgroundColor: bg,
                        borderLeft: `4px solid ${color}`,
                      }}
                    >
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <span style={{ color }}>{actionLabel}</span>
                        <small className="text-muted">{formatDate(log.changedAt)}</small>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="table-responsive">
                        <Table bordered hover size="sm">
                          <thead style={{ backgroundColor: color, color: "white" }}>
                            <tr className="text-center">
                              <th>SL No</th>
                              <th>Field Name</th>
                              <th>From</th>
                              <th>To</th>
                            </tr>
                          </thead>
                          <tbody>
                            {log.changes?.length > 0 ? (
                              log.changes.map((change, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{change.item || "-"}</td>
                                  <td>{change.from || "-"}</td>
                                  <td>{change.to || "-"}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={4} className="text-center text-muted">
                                  No field-level changes recorded.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default KiduAuditLog;
