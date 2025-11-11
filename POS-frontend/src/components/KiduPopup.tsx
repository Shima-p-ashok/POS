import { useMemo, useState, useEffect } from "react";
import { Modal, Table, Button, Form, InputGroup } from "react-bootstrap";
import HttpService from "../services/Common/HttpService";
import type { CustomResponse } from "../types/Common/ApiTypes";

interface KiduPopupProps<T> {
  show: boolean;
  handleClose: () => void;
  apiEndpoint: string;
  columns: { key: keyof T; label: string }[];
  searchKeys: (keyof T)[];
  title?: string;
  onSelect?: (item: T) => void;
}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const KiduPopup = <T extends Record<string, any>>({
  show,
  handleClose,
  apiEndpoint,
  columns,
  searchKeys,
  title = "Select Item",
  onSelect,
}: KiduPopupProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (show) {
      HttpService.callApi<CustomResponse<T[]>>(apiEndpoint, "GET")
        .then((res) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((res.isSuccess || (res as any).isSucess) && res.value) {
            setData(res.value);
          }
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [show, apiEndpoint]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) =>
      searchKeys.some((key) => 
        String(item[key] || "").toLowerCase().includes(q)
      )
    );
  }, [query, data, searchKeys]);

  const handleSelect = (item: T) => {
    onSelect?.(item);
    handleClose();
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg" 
      centered 
      className="head-font"
    >
      <Modal.Header 
        closeButton 
        style={{ 
          background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
          color: "white" 
        }}
      >
        <Modal.Title style={{ fontSize: "1rem", fontWeight: "600" }}>
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "#fdfdfd" }}>
        <InputGroup className="mb-3">
          <Form.Control
            size="sm"
            type="text"
            placeholder={`Search by ${searchKeys.join(", ")}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => setQuery("")}
          >
            Clear
          </Button>
        </InputGroup>

        <Table responsive bordered hover size="sm" className="bg-white">
          <thead 
            style={{
              background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
              color: "white"
            }}
          >
            <tr className="text-center">
              <th>Sl</th>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleSelect(item)}
                  style={{
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e8f0fe";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <td>{idx + 1}</td>
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {String(item[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center text-muted">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default KiduPopup;