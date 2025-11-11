// src/components/KiduDownload.tsx
import React from "react";
import { Button } from "react-bootstrap";
import { FaFileExcel } from "react-icons/fa";
import { CSVLink } from "react-csv";

interface KiduDownloadProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    filename: string;
    className?: string;
    style?: React.CSSProperties;
}

const KiduDownload: React.FC<KiduDownloadProps> = ({
    data,
    filename,
    className,
    style,
}) => {
    return (
        <CSVLink data={data} filename={filename} style={{ textDecoration: "none" }}>
            <Button
                className={`d-flex align-items-center justify-content-center ${className || ""}`}
                style={{
                    backgroundColor: "#fff",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "4px",
                    padding: "3px 6px",
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    ...style,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "brightness(1)";
                }}
            >
                <FaFileExcel size={16} />
            </Button>
        </CSVLink>
    );
};

export default KiduDownload;
