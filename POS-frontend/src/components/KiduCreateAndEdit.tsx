import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  as?: "textarea";
  readOnly?: boolean;
  popup?: {
    onOpen: () => void;
  };
}

interface KiduCreateAndEditProps {
  title: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, string | number | boolean>) => void;
  loading?: boolean;
  submitText?: string;
  initialData?: Record<string, string | number | boolean>;
}

interface LocationState {
  formData?: Record<string, string | number | boolean>;
}

const KiduCreateAndEdit: React.FC<KiduCreateAndEditProps> = ({
  title,
  fields,
  onSubmit,
  loading = false,
  submitText = "Create",
  initialData = {},
}) => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const initialFormData: Record<string, string | number | boolean> = {};
  fields.forEach((field) => (initialFormData[field.name] = ""));

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (state?.formData) {
      setFormData(state.formData);
      setIsEditMode(true);
    } else if (Object.keys(initialData).length > 0) {
      setFormData(initialData);
      setIsEditMode(true);
    }
  }, [state, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      Swal.fire("Error", "Please fill all required fields.", "error");
    }
  };

  const handleReset = () => {
    if (isEditMode && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  };

  return (
    <Card
      className="mx-3"
      style={{
        maxWidth: "100%",
        fontSize: "0.85rem",
        backgroundColor: "#f0f0f0ff",
        fontFamily: "Urbanist",
      }}
    >
      <Card.Header
        style={{
          background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
          color: "white",
          padding: "0.5rem",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 p-2 fw-medium fs-5">
            {isEditMode ? `Edit ${title}` : title}
          </h6>
        </div>
      </Card.Header>

      <Card.Body style={{ padding: "1rem" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-2 mx-3">
            {fields.map((field, idx) => {
              const isIdField =
                field.name.toLowerCase().endsWith("id") ||
                field.name.toLowerCase() === "id";

              const hasPopup = field.popup && field.popup.onOpen;

              return (
                <Col
                  key={idx}
                  xs={12}
                  md={field.as === "textarea" ? 12 : 6}
                  className="mb-3"
                >
                  <Form.Label className="mb-1 fw-medium">
                    {field.label}
                    {field.required && <span className="text-danger"> *</span>}
                  </Form.Label>

                  {hasPopup ? (
                    <InputGroup>
                      <Form.Control
                        size="sm"
                        type={field.type}
                        name={field.name}
                        value={String(formData[field.name] ?? "")}
                        onChange={handleChange}
                        placeholder={field.placeholder || `Select ${field.label}`}
                        required={field.required}
                        readOnly
                        onClick={field.popup?.onOpen}
                        className="p-2 custom-input"
                        style={{
                          backgroundColor: "#ffffffff",
                          cursor: "pointer",
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={field.popup?.onOpen}
                        style={{
                          background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
                          border: "none",
                        }}
                      >
                        <BsSearch />
                      </Button>
                    </InputGroup>
                  ) : field.as === "textarea" ? (
                    <Form.Control
                      as="textarea"
                      rows={field.name === "description" ? 3 : 5}
                      name={field.name}
                      value={String(formData[field.name] ?? "")}
                      onChange={handleChange}
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      required={field.required}
                      readOnly={isIdField || field.readOnly}
                      className="p-2 custom-input custom-placeholder"
                      style={{
                        backgroundColor: isIdField ? "#f1f1f1" : "#ffffffff",
                        fontSize: "0.85rem",
                        resize: "none",
                        cursor: isIdField ? "not-allowed" : "auto",
                      }}
                    />
                  ) : (
                    <Form.Control
                      size="sm"
                      type={field.type}
                      name={field.name}
                      value={String(formData[field.name] ?? "")}
                      onChange={handleChange}
                      placeholder={field.placeholder || `Enter ${field.label}`}
                      required={field.required}
                      readOnly={isIdField || field.readOnly}
                      className="p-2 custom-input custom-placeholder"
                      style={{
                        backgroundColor: isIdField ? "#f1f1f1" : "#ffffffff",
                        color: "#000",
                        cursor: isIdField ? "not-allowed" : "auto",
                      }}
                    />
                  )}

                  {errors[field.name] && (
                    <small className="text-danger mt-1">
                      {errors[field.name]}
                    </small>
                  )}
                </Col>
              );
            })}
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              className="px-4"
              variant="secondary"
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="px-4"
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
                border: "none",
                color: "white",
              }}
            >
              {loading ? "Saving..." : isEditMode ? "Update" : submitText}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default KiduCreateAndEdit;