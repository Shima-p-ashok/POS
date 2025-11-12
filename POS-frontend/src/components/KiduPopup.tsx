import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import HttpService from "../services/Common/HttpService";
import KiduTable from "./KiduTable";
import type { CustomResponse } from "../types/Common/ApiTypes"; // ✅ Reusable API type

interface KiduPopupProps<T> {
  show: boolean;
  handleClose: () => void;
  title: string;
  fetchEndpoint: string;
  columns: { key: keyof T; label: string }[];
  onSelect?: (item: T) => void;
  AddModalComponent?: React.ComponentType<{
    show: boolean;
    handleClose: () => void;
    onAdded: (newItem: T) => void;
  }>;
  searchKeys?: (keyof T)[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function KiduPopup<T extends Record<string, any>>({
  show,
  handleClose,
  title,
  fetchEndpoint,
  columns,
  onSelect,
  AddModalComponent,
  searchKeys,
}: KiduPopupProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (show) {
      setLoading(true);

      HttpService.callApi<CustomResponse<T[]>>(fetchEndpoint, "GET")
        .then((res) => {
          // ✅ Robust and type-safe response handler
          if (Array.isArray(res)) {
            // Direct array
            setData(res);
          } else if (res.isSuccess && Array.isArray(res.value)) {
            // value contains array
            setData(res.value);
          } else if (
            res.value &&
            typeof res.value === "object" &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.isArray((res.value as any).data)
          ) {
            // Nested array inside value.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setData((res.value as any).data);
          } else {
            console.warn("⚠️ Unexpected API format:", res);
          }
        })
        .catch((err) => console.error("❌ Error fetching popup data:", err))
        .finally(() => setLoading(false));
    }
  }, [show, fetchEndpoint]);

  // 🔍 Filter results
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !searchKeys?.length) return data;
    return data.filter((item) =>
      searchKeys.some(
        (key) => item[key] && item[key].toString().toLowerCase().includes(q)
      )
    );
  }, [query, data, searchKeys]);

  const handleRowClick = (item: T) => {
    onSelect?.(item);
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        className="head-font"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa" }}>
          <Modal.Title className="fs-6 fw-semibold text-dark">
            {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ minHeight: "300px" }}>
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" size="sm" /> Loading...
            </div>
          ) : (
            <>
              <KiduTable
                columns={columns.map((col) => ({
                  key: String(col.key),
                  label: col.label,
                }))}
                data={filtered}
                showActions={false}
                showSearch={true}
                onSearchChange={(val) => setQuery(val)}
                onRowClick={handleRowClick}
              />
              {filtered.length === 0 && AddModalComponent && (
                <div className="text-center my-4">
                  <Button
                    size="sm"
                    style={{ backgroundColor: "#18575A" }}
                    className="text-white"
                    onClick={() => setShowAddModal(true)}
                  >
                    + Add New
                  </Button>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Optional Add Modal */}
      {AddModalComponent && (
        <AddModalComponent
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          onAdded={(newItem) => {
            setData((prev) => [...prev, newItem]);
            setShowAddModal(false);
          }}
        />
      )}
    </>
  );
}

export default KiduPopup;
