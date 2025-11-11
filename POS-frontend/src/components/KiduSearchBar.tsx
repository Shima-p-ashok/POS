import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface KiduSearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  width?: string; // optional width prop for flexibility
}

const KiduSearchBar: React.FC<KiduSearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  width = "400px", // default reduced width
}) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch(value.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ width, maxWidth: "100%" }}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            borderRight: "none",
            borderColor: "#dee2e6",
            boxShadow: "none",
            fontFamily: "Urbanist",
          }}
        />
        <Button
          onClick={handleSearch}
          style={{
            background: "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
            border: "none",
            color: "white",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <FaSearch />
        </Button>
      </InputGroup>
    </div>
  );
};

export default KiduSearchBar;
