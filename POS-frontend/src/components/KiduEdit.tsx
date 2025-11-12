import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import KiduPrevious from "./KiduPrevious";

interface FieldShape {
  name: string;
  label: string;
  type: string;
  as?: "textarea" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
}

interface KiduEditProps {
  title: string;
  fields: FieldShape[];
  onSubmit: (formData: Record<string, unknown>) => void;
  loading?: boolean;
  initialData: Record<string, unknown>;
  children?: React.ReactNode;
}

const KiduEdit: React.FC<KiduEditProps> = ({
  title,
  fields,
  onSubmit,
  loading = false,
  initialData,
  children,
}) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ Fixed useEffect dependencies (removed JSON.stringify warning)
  useEffect(() => {
    const temp: Record<string, unknown> = {};
    fields.forEach(f => (temp[f.name] = initialData[f.name] ?? ""));
    setFormData(temp);
  }, [fields, initialData]); // <-- clean and correct dependencies

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach(f => {
      const value = (formData[f.name] as string) || "";
      if (f.required && !value) newErrors[f.name] = `${f.label} is required`;
      if (f.type === "email" && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) newErrors[f.name] = "Please enter a valid email address";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.warn("Please fill all required fields!");
      return;
    }
    try {
      onSubmit(formData);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <Card className="mx-2 my-3 shadow-sm rounded-3">
      <Card.Header
        className="d-flex align-items-center gap-3"
        style={{ backgroundColor: "#3B82F6", color: "white", padding: "0.25rem 0.75rem" }}
      >
        <KiduPrevious />
        <h5 className="mb-0 fw-bold">{title}</h5>
      </Card.Header>

      <Card.Body style={{ backgroundColor: "#f7f7f7ff", padding: "1.5rem", fontFamily: "Urbanist" }}>
        <Form onSubmit={handleSubmit}>
          {/* Read-only fields */}
          {fields
            .filter(f => f.readOnly)
            .map((field, idx) => (
              <div key={idx} className="mb-3">
                <Form.Label className="fw-semibold">{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={(formData[field.name] as string) ?? ""}
                  readOnly
                  style={{ color: "red", backgroundColor: "#f8f8f8", fontWeight: 600 }}
                />
              </div>
            ))}

          <Row>
            {fields
              .filter(f => !f.readOnly)
              .map((field, idx) => {
                const isTextarea = field.as === "textarea";
                const isSelect = field.as === "select" && field.options;
                return (
                  <Col key={idx} xs={12} md={6} className="mb-3">
                    <Form.Label className="fw-semibold">
                      {field.label} {field.required && <span className="text-danger">*</span>}
                    </Form.Label>

                    {isTextarea ? (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name={field.name}
                        value={(formData[field.name] as string) ?? ""}
                        onChange={handleChange}
                        placeholder={field.placeholder || `Enter ${field.label}`}
                        required={field.required}
                      />
                    ) : isSelect ? (
                      <Form.Select
                        name={field.name}
                        value={(formData[field.name] as string) ?? ""}
                        onChange={handleChange}
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options!.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        value={(formData[field.name] as string) ?? ""}
                        onChange={handleChange}
                        placeholder={field.placeholder || `Enter ${field.label}`}
                        required={field.required}
                      />
                    )}
                    {errors[field.name] && <small className="text-danger">{errors[field.name]}</small>}
                  </Col>
                );
              })}
          </Row>

          {children}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              type="submit"
              style={{ backgroundColor: "#3B82F6", border: "none", minWidth: "120px" }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Update"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default KiduEdit;
