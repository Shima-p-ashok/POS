import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaLayerGroup,
  FaBuilding,
  FaIndustry,
  FaCube,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import KiduPrevious from "../../../components/KiduPrevious";
import KiduCard from "../../../components/KiduCard";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Category",
      icon: <FaLayerGroup size={28} />,
      color: "#3B82F6",
      route: "/category",
    },
    {
      title: "Company",
      icon: <FaBuilding size={28} />,
      color: "#10B981",
      route: "/company",
    },
    {
      title: "Manufacturer",
      icon: <FaIndustry size={28} />,
      color: "#F59E0B",
      route: "/manufacturer",
    },
    {
      title: "Product",
      icon: <FaCube size={28} />,
      color: "#8B5CF6",
      route: "/product",
    },
    {
      title: "Users",
      icon: <FaUserShield size={28} />,
      color: "#EF4444",
      route: "/users",
    },
  ];

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />
      <Container fluid className="py-4 px-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary mb-1">⚙️ Settings</h3>
          <p className="text-muted mb-0">
            Manage your system configurations and master data
          </p>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
          {menuItems.map((item, index) => (
            <Col key={index} style={{ minWidth: "220px" }}>
              <KiduCard
                title={item.title}
                icon={item.icon}
                color={item.color}
                onClick={() => navigate(item.route)}
                
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Settings;
