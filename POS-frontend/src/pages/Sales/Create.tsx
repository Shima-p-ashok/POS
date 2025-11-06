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

const SalesCreate: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #3B82F6)",
    border: "none",
    borderRadius: "25px",
    padding: "10px 20px",
    color: "white",
    fontWeight: "bold",
  };

  // State for items
  const [items, setItems] = useState<Item[]>([]);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);

  const handleAddItem = () => {
    if (!itemId || !itemName || quantity <= 0 || unitPrice <= 0) {
      alert("Please fill all fields with valid values");
      return;
    }

    const newItem: Item = {
      id: itemId,
      name: itemName,
      quantity,
      unitPrice,
      totalPrice: quantity * unitPrice,
    };

    setItems([...items, newItem]);

    // Reset input fields
    setItemId("");
    setItemName("");
    setQuantity(0);
    setUnitPrice(0);
  };

  return (
    <div className="bg-light" style={{ minHeight: "100vh", padding: "20px" }}>
    <KiduPrevious/>
    <Container
      className="p-4 m-5 mt-5 rounded-4"
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
        Create New Sale
      </h4>

      {/* Customer & Sale Info */}
      <Row className="mb-4 g-3">
        <Col md={2} sm={6}>
          <Form.Label>Invoice ID</Form.Label>
          <Form.Control type="text" placeholder="INV001" />
        </Col>
        <Col md={4} sm={6}>
          <Form.Label>Customer Name</Form.Label>
          <Form.Control type="text" placeholder="Enter customer name" />
        </Col>
        <Col md={3} sm={6}>
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" />
        </Col>
      </Row>

      {/* Items Input */}
      <Row className="align-items-end mb-3 g-3">
        <Col md={2} sm={6}>
          <Form.Label>Item ID</Form.Label>
          <Form.Control
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            placeholder="ID001"
          />
        </Col>
        <Col md={3} sm={6}>
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
          />
        </Col>
        <Col md={2} sm={4}>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Qty"
          />
        </Col>
        <Col md={2} sm={4}>
          <Form.Label>Unit Price</Form.Label>
          <Form.Control
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            placeholder="₹0"
          />
        </Col>
        <Col md={3} sm={4}>
          <Button style={buttonStyle} onClick={handleAddItem}>
            + Add Item
          </Button>
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
                  <td>{item.quantity}</td>
                  <td>₹{item.unitPrice}</td>
                  <td>₹{item.totalPrice}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setItems(items.filter((_, i) => i !== index))
                      }
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

      {/* Total & Payment */}
      <Row className="mb-4 g-3">
        <Col md={3} sm={6}>
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            type="text"
            placeholder={`₹${items.reduce(
              (acc, item) => acc + item.totalPrice,
              0
            )}`}
            readOnly
          />
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

      {/* Submit Button */}
      <div className="d-flex justify-content-end">
        <Button style={buttonStyle}>Submit</Button>
      </div>
    </Container>
    </div>
  );
};

export default SalesCreate;
