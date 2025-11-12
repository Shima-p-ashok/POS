import React from "react";
import {
  FaShoppingCart,
  FaTags,
  FaWarehouse,
  FaFileInvoice,
  FaCog,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import KiduCard from "../../components/KiduCard";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Sales",
      icon: <FaShoppingCart size={28} />,
      color: "#7DD3FC",
      route: "/sales",
    },
    {
      title: "Purchase",
      icon: <FaTags size={28} />,
      color: "#86EFAC",
      route: "/purchase",
    },
    {
      title: "Inventory",
      icon: <FaWarehouse size={28} />,
      color: "#FACC15",
      route: "/inventory",
    },
    {
      title: "Customers",
      icon: <FaUsers size={28} />,
      color: "#A78BFA",
      route: "/customers",
    },
    {
      title: "Quotation",
      icon: <FaFileInvoice size={28} />,
      color: "#FB923C",
      route: "/quotation",
    },
    {
      title: "Reports",
      icon: <FaChartLine size={28} />,
      color: "#60A5FA",
      route: "/reports",
    },
    {
      title: "Settings",
      icon: <FaCog size={28} />,
      color: "#9CA3AF",
      route: "/settings",
    },
  ];

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      
      <Container fluid className="py-4 px-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary mb-1">📊 Control Panel</h3>
          <p className="text-muted mb-0">
            Access your control panel and manage all business modules
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

export default Dashboard;
