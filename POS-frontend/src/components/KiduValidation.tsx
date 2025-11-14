
/* eslint-disable react-refresh/only-export-components */
import React from "react";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ValidationRule {
  type?: "text" | "number" | "email" | "url" | "textarea" | "popup";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  label?: string;
}

export const KiduValidation = {
  validate(value: unknown, rules: ValidationRule): ValidationResult {
    const val = String(value ?? "").trim();
    const label = rules.label || "This field";

    if (rules.required && !val) {
      return { isValid: false, message: `${label} is required.` };
    }

    if (rules.type === "number" && val && isNaN(Number(val))) {
      return { isValid: false, message: `${label} must be a number.` };
    }

    if (rules.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return { isValid: false, message: `Please enter a valid email address.` };
    }

    if (rules.type === "url" && val && !/^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/.test(val)) {
      return { isValid: false, message: `Please enter a valid website URL.` };
    }

    if (rules.minLength && val.length < rules.minLength) {
      return { isValid: false, message: `${label} must be at least ${rules.minLength} characters.` };
    }

    if (rules.maxLength && val.length > rules.maxLength) {
      return { isValid: false, message: `${label} must be less than ${rules.maxLength} characters.` };
    }

    if (rules.pattern && val && !rules.pattern.test(val)) {
      return { isValid: false, message: `Invalid ${label.toLowerCase()}.` };
    }

    return { isValid: true };
  },
};

export const ValidationMessage: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <div style={{ fontSize: "0.8rem", color: "#EF4444", marginTop: "4px", fontFamily: "Urbanist" }}>
      {message}
    </div>
  );
};

export default KiduValidation;
