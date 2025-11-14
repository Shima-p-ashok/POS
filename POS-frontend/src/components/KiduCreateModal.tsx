import { useState } from "react";
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import HttpService from "../services/Common/HttpService";

interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "textarea";
  required?: boolean;
}

interface KiduCreateModalProps<T> {
  show: boolean;
  handleClose: () => void;
  title: string;
  fields: Field[];
  endpoint: string; // API endpoint for creation
  onCreated: (newItem: T) => void;
}

function KiduCreateModal<T>({
  show,
  handleClose,
  title,
  fields,
  endpoint,
  onCreated,
}: KiduCreateModalProps<T>) {
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await HttpService.callApi<T>(endpoint, "POST", formData);

      Swal.fire({
        title: "Created!",
        text: "Item added successfully",
        icon: "success",
        confirmButtonColor: "#3B82F6",
      });

      onCreated(res as T);
      handleClose();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err instanceof Error ? err.message : "Failed to add item",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ background: "#f8f9fa" }}>
        <Modal.Title className="fs-6 fw-semibold text-dark">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field) => (
            <Form.Group key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              {field.type === "textarea" ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : (
                <Form.Control
                  type={field.type}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#3B82F6", border: "none" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" /> Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KiduCreateModal;