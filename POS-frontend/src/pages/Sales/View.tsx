import React from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import KiduPrevious from "../../components/KiduPrevious";

const SalesView: React.FC = () => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />

      <Container
        className="p-4 mt-3 rounded-4"
        style={{
          backgroundColor: "#ffffffff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          fontFamily: "Urbanist",
        }}>
        <h4
          className="fw-bold mb-4"
          style={{
            background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}>
          View Sale Details
        </h4>

        {/* Customer & Sale Info */}
        <Row className="mb-4 g-3">
          <Col md={2} sm={6}>
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control type="text" placeholder="INV001" readOnly />
          </Col>
          <Col md={4} sm={6}>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" placeholder="John Doe" readOnly />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="2025-10-23" readOnly />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label>Payment Mode</Form.Label>
            <Form.Control type="text" placeholder="Cash" readOnly />
          </Col>
        </Row>

        {/* Items Table */}
        <div className="table-responsive shadow-sm rounded-4 bg-white mb-4">
          <Table bordered hover responsive className="align-middle mb-0">
            <thead
              style={{
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
                color: "white",
              }}>
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IT001</td>
                <td>Item A</td>
                <td>2</td>
                <td>₹100</td>
                <td>₹200</td>
              </tr>
              <tr>
                <td>IT002</td>
                <td>Item B</td>
                <td>1</td>
                <td>₹150</td>
                <td>₹150</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Total Amount */}
        <Row>
          <Col md={3} sm={6}>
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" placeholder="₹350" readOnly />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SalesView;
