import React, { useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import KiduPrevious from "../../components/KiduPrevious";

interface Item {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const SalesEdit: React.FC = () => {
  // Example items state for editing
  const [items, setItems] = useState<Item[]>([
    { id: "IT001", name: "Item A", quantity: 2, unitPrice: 100, totalPrice: 200 },
    { id: "IT002", name: "Item B", quantity: 1, unitPrice: 150, totalPrice: 150 },
  ]);

  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
    border: "none",
    borderRadius: "25px",
    padding: "10px 20px",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
      <KiduPrevious />

      <Container
        className="p-4 mt-3 rounded-4"
        style={{
          backgroundColor: "#ffffffff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          fontFamily: "Urbanist",
        }}
      >
        <h4
          className="fw-bold mb-4"
          style={{
            background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Edit Sale
        </h4>

        {/* Customer & Sale Info */}
        <Row className="mb-4 g-3">
          <Col md={2} sm={6}>
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control type="text" placeholder="INV001" />
          </Col>
          <Col md={4} sm={6}>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" placeholder="John Doe" />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" />
          </Col>
          <Col md={3} sm={6}>
            <Form.Label>Payment Mode</Form.Label>
            <Form.Select>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Items Table */}
        <div className="table-responsive shadow-sm rounded-4 bg-white mb-4">
          <Table bordered hover responsive className="align-middle mb-0">
            <thead
              style={{
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
                color: "white",
              }}
            >
              <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No items added
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].quantity = Number(e.target.value);
                          newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
                          setItems(newItems);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].unitPrice = Number(e.target.value);
                          newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
                          setItems(newItems);
                        }}
                      />
                    </td>
                    <td>₹{item.totalPrice}</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setItems(items.filter((_, i) => i !== index))}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Total Amount */}
        <Row className="mb-4">
          <Col md={3} sm={6}>
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder={`₹${items.reduce((acc, item) => acc + item.totalPrice, 0)}`}
              readOnly
            />
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button style={buttonStyle}>Save Changes</Button>
        </div>
      </Container>
    </div>
  );
};

export default SalesEdit;
