import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Spinner,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  Upload,
  Download,
  Trash2,
  FileText,
  X,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  FileAudio,
  FileVideo,
  FileJson,
  FileCode,
  FileType,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import type { Attachment } from "../types/Common/AttachmentTypes";
import {
  deleteAttachment,
  downloadAttachment,
  getAttachments,
  uploadAttachment,
} from "../services/Common/AttachmentService";

interface KiduAttachmentProps {
  tableName: string;
  recordId: string | number;
}

const KiduAttachment: React.FC<KiduAttachmentProps> = ({ tableName, recordId }) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (tableName && recordId) fetchAttachments();
  }, [tableName, recordId]);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      const data = await getAttachments(tableName, recordId);
      setAttachments(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load attachments.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((files: File[]) => {
    if (files.length) setSelectedFile(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const handleUpload = async () => {
    if (!selectedFile) return setUploadError("Please select a file to upload");
    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("File", selectedFile);
      fd.append("TableName", tableName);
      fd.append("RecordId", recordId.toString());
      if (description) fd.append("Description", description);
      await uploadAttachment(fd);
      await fetchAttachments();
      handleCloseModal();
    } catch {
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteAttachment = (id: number) => {
    setAttachmentToDelete(id);
    setShowDeleteModal(true);
  };
  const handleDeleteConfirmed = async () => {
    if (!attachmentToDelete) return;
    const deletedBy = localStorage.getItem("userName") || "Unknown";
    try {
      await deleteAttachment(attachmentToDelete, deletedBy);
      await fetchAttachments();
    } finally {
      setShowDeleteModal(false);
      setAttachmentToDelete(null);
    }
  };

  const handleDownload = async (id: number, name: string) => {
    try {
      await downloadAttachment(id, name);
    } catch {
      alert("Failed to download file.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setDescription("");
    setUploadError(null);
  };

  const formatFileSize = (b: number) => {
    if (!b) return "0 Bytes";
    const s = ["Bytes", "KB", "MB", "GB"],
      i = Math.floor(Math.log(b) / Math.log(1024));
    return (b / Math.pow(1024, i)).toFixed(2) + " " + s[i];
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const getFileIcon = (f: string) => {
    const e = f.split(".").pop()?.toLowerCase();
    const I = (x: JSX.Element, c: string) => React.cloneElement(x, { className: c });
    switch (e) {
      case "pdf": return I(<FileText size={16} />, "text-danger");
      case "xls": case "xlsx": return I(<FileSpreadsheet size={16} />, "text-success");
      case "doc": case "docx": return I(<FileText size={16} />, "text-primary");
      case "png": case "jpg": case "jpeg": case "gif": return I(<FileImage size={16} />, "text-warning");
      case "zip": case "rar": return I(<FileArchive size={16} />, "text-secondary");
      case "mp3": case "wav": return I(<FileAudio size={16} />, "text-info");
      case "mp4": case "mov": case "avi": return I(<FileVideo size={16} />, "text-info");
      case "json": return I(<FileJson size={16} />, "text-muted");
      case "js": case "ts": case "jsx": case "tsx": case "html": case "css": return I(<FileCode size={16} />, "text-secondary");
      default: return I(<FileType size={16} />, "text-dark");
    }
  };

  return (
    <>
      <Accordion className="mt-4 mb-4 custom-accordion" style={{ backgroundColor: "#f0f0f0ff" }}>
        <Accordion.Item eventKey="0">
          <Card.Header
            as={Accordion.Button}
            className="custom-attachment-header"
            style={{
              backgroundColor: "#0B3D91",
              color: "white",
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              height: "50px",
            }}
          >
            <h6 className="mb-0 fw-medium">Attachments</h6>
          </Card.Header>

          <Accordion.Body className="border rounded p-3">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white py-2 px-3">
                <h6 className="mb-0">Attachment List</h6>
                <Button size="sm" variant="light" onClick={() => setShowModal(true)}>
                  <Upload size={14} className="me-1" /> Add
                </Button>
              </Card.Header>

              <Card.Body className="p-2">
                {loading ? (
                  <div className="text-center py-3">
                    <Spinner animation="border" size="sm" /> Loading...
                  </div>
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : attachments.length === 0 ? (
                  <div className="text-center py-3 text-muted small">
                    <FileText size={28} className="mb-2" />
                    <div>No attachments found</div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table hover bordered size="sm" className="align-middle mb-0" style={{ fontSize: "0.85rem" }}>
                      <thead className="table-light text-center">
                        <tr>
                          <th style={{ width: "5%" }}>#</th>
                          <th style={{ width: "35%" }}>File</th>
                          <th style={{ width: "30%" }}>Description</th>
                          <th style={{ width: "10%" }}>Size</th>
                          <th style={{ width: "15%" }}>Uploaded</th>
                          <th style={{ width: "5%" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attachments.map((a, i) => (
                          <tr key={a.attachmentId}>
                            <td className="text-center">{i + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="me-2">{getFileIcon(a.fileName)}</span>
                                <span className="text-truncate" title={a.fileName} style={{ maxWidth: "180px" }}>
                                  {a.fileName}
                                </span>
                              </div>
                            </td>
                            <td className="text-truncate" style={{ maxWidth: "180px" }}>{a.description || "-"}</td>
                            <td className="text-center">{formatFileSize(a.fileSize)}</td>
                            <td className="text-center">
                              <small>{formatDate(a.uploadedAt)}</small><br />
                              <small className="text-muted">by {a.uploadedBy}</small>
                            </td>
                            <td className="text-center">
                              <div className="d-flex justify-content-center">
                                <OverlayTrigger overlay={<Tooltip>Download</Tooltip>}>
                                  <Button variant="outline-secondary" size="sm" className="me-1 p-0 px-1"
                                    onClick={() => handleDownload(a.attachmentId, a.fileName)}>
                                    <Download size={14} />
                                  </Button>
                                </OverlayTrigger>
                                <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                                  <Button variant="outline-danger" size="sm" className="p-0 px-1"
                                    onClick={() => confirmDeleteAttachment(a.attachmentId)}>
                                    <Trash2 size={14} />
                                  </Button>
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Upload Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="md">
              <Modal.Header closeButton className="bg-primary text-white py-2 px-3">
                <Modal.Title className="fs-6">
                  <Upload size={18} className="me-2" /> Upload Attachment
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-3">
                {uploadError && <Alert variant="danger">{uploadError}</Alert>}
                <div {...getRootProps()} className={`border border-2 rounded p-3 text-center ${isDragActive ? "bg-light border-primary" : "bg-light"}`} style={{ cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  <Upload size={18} className="mb-2" />
                  <p className="mb-0 small">{isDragActive ? "Drop file here..." : "Drag & drop file here or click to select"}</p>
                </div>
                {selectedFile && (
                  <div className="mt-2 d-flex justify-content-between align-items-center p-2 bg-light rounded">
                    <div className="d-flex align-items-center gap-2 small">
                      {getFileIcon(selectedFile.name)}
                      <span>{selectedFile.name} ({formatFileSize(selectedFile.size)})</span>
                    </div>
                    <Button variant="outline-danger" size="sm" className="p-0 px-1" onClick={() => setSelectedFile(null)}>
                      <X size={14} />
                    </Button>
                  </div>
                )}
                <Form.Group className="mt-2">
                  <Form.Label className="small mb-1">Description</Form.Label>
                  <Form.Control as="textarea" rows={2} value={description} onChange={e => setDescription(e.target.value)} maxLength={300} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer className="py-2 px-3">
                <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={handleUpload} disabled={!selectedFile || uploading}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered size="sm">
              <Modal.Header closeButton className="py-2 px-3">
                <Modal.Title className="fs-6">Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body className="py-3 px-3">Are you sure you want to delete this attachment?</Modal.Body>
              <Modal.Footer className="py-2 px-3">
                <Button variant="secondary" size="sm" onClick={() => setShowDeleteModal(false)}>No</Button>
                <Button variant="danger" size="sm" onClick={handleDeleteConfirmed}>Yes, Delete</Button>
              </Modal.Footer>
            </Modal>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Style for blue header */}
      <style>{`
        .custom-attachment-header.accordion-button {
          background-color: #0B3D91 !important;
          color: white !important;
          box-shadow: none !important;
        }
        .custom-attachment-header.accordion-button:not(.collapsed) {
          background-color: #0B3D91 !important;
          color: white !important;
        }
        .custom-attachment-header.accordion-button::after {
          filter: invert(1); /* makes arrow white */
        }
      `}</style>
    </>
  );
};

export default KiduAttachment;
