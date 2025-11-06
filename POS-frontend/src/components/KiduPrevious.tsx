import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const KiduPrevious: React.FC<{ label?: string }> = ({ label = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      className="btn d-flex align-items-center gap-2 px-3 py-2 shadow-sm fw-medium"
      style={{
        background:
          "linear-gradient(90deg, rgba(59,130,246,1) ",
        color: "white",
        border: "none",
        borderRadius: "50px",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => navigate(-1)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(79,70,229,0.4)";
        e.currentTarget.style.filter = "brightness(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.filter = "brightness(1)";
      }}
    >
      <FaArrowLeft size={16} />
      {label}
    </button>
  );
};

export default KiduPrevious;
