import React from "react";

interface KiduCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const KiduCard: React.FC<KiduCardProps> = ({ title, icon, color, onClick }) => {
  return (
    <div
      className="card border-0 shadow-sm text-white text-center p-4 h-100"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        borderRadius: "20px",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "120px" }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center mb-3"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
        >
          {icon}
        </div>
        <h6 className="fw-semibold mb-0 text-uppercase">{title}</h6>
      </div>
    </div>
  );
};

export default KiduCard;
