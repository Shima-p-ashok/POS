import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Modal, Form, Table, Spinner, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Upload, Download, Trash2, FileText, X, FileSpreadsheet, FileImage, FileArchive, FileAudio, FileVideo, FileJson, FileCode, FileType } from "lucide-react";
import { useDropzone } from "react-dropzone";

import type { Attachment } from "../types/Common/AttachmentTypes";
import { deleteAttachment, downloadAttachment, getAttachments, uploadAttachment } from "../services/Common/AttachmentService";

interface AttachmentsProps {
  tableName: string;
  recordId: string | number;
}

const Attachments: React.FC<AttachmentsProps> = ({ tableName, recordId }) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [attachmentToDelete, setAttachmentToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (tableName && recordId) fetchAttachments();
  }, [tableName, recordId]);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAttachments(tableName, recordId);
      setAttachments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load attachments.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((files: File[]) => {
    if (files.length) setSelectedFile(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("File", selectedFile);
      formData.append("TableName", tableName);
      formData.append("RecordId", recordId.toString());
      if (description) formData.append("Description", description);

      await uploadAttachment(formData);
      await fetchAttachments();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteAttachment = (attachmentId: number) => {
    setAttachmentToDelete(attachmentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!attachmentToDelete) return;
    const deletedBy = localStorage.getItem("userName") || "Unknown";
    try {
      await deleteAttachment(attachmentToDelete, deletedBy);
      await fetchAttachments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete attachment.");
    } finally {
      setShowDeleteModal(false);
      setAttachmentToDelete(null);
    }
  };

  const handleDownload = async (attachmentId: number, fileName: string) => {
    try {
      await downloadAttachment(attachmentId, fileName);
    } catch (err) {
      console.error(err);
      alert("Failed to download file.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setDescription("");
    setUploadError(null);
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf": return <FileText size={20} className="text-danger" />;
      case "xls": case "xlsx": return <FileSpreadsheet size={20} className="text-success" />;
      case "doc": case "docx": return <FileText size={20} className="text-primary" />;
      case "png": case "jpg": case "jpeg": case "gif": return <FileImage size={20} className="text-warning" />;
      case "zip": case "rar": return <FileArchive size={20} className="text-secondary" />;
      case "mp3": case "wav": return <FileAudio size={20} className="text-info" />;
      case "mp4": case "mov": case "avi": return <FileVideo size={20} className="text-info" />;
      case "json": return <FileJson size={20} className="text-muted" />;
      case "js": case "ts": case "jsx": case "tsx": case "html": case "css": return <FileCode size={20} className="text-purple-600" />;
      default: return <FileType size={20} className="text-dark" />;
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header className="d-flex justify-content-between align-items-center" style={{ backgroundColor: "#3B82F6", color: "white" }}>
        <h6 className="mb-0 fw-medium">Attachments</h6>
        <Button size="sm" variant="light" onClick={() => setShowModal(true)}>
          <Upload size={16} /> Add Attachment
        </Button>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center py-4"><Spinner animation="border" /> <p>Loading attachments...</p></div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : attachments.length === 0 ? (
          <div className="text-center py-4">
            <FileText size={35} className="text-muted mb-2" />
            <p className="text-muted mb-0">No attachments found.</p>
            <p className="text-muted small">Click "Add Attachment" to upload files.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover size="sm" className="mb-0 align-middle">
              <thead style={{ backgroundColor: "#e9ecef", fontSize: "0.85rem" }}>
                <tr>
                  <th style={{ width: "5%", padding: "0.3rem" }}>SL</th>
                  <th style={{ width: "35%", padding: "0.3rem" }}>File Name</th>
                  <th style={{ width: "30%", padding: "0.3rem" }}>Description</th>
                  <th style={{ width: "10%", padding: "0.3rem" }}>Size</th>
                  <th style={{ width: "15%", padding: "0.3rem", fontSize: "0.75rem" }}>Uploaded</th>
                  <th style={{ width: "5%", padding: "0.3rem" }} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((att, i) => (
                  <tr key={att.attachmentId} style={{ fontSize: "0.875rem" }}>
                    <td style={{ padding: "0.35rem" }}>{i + 1}</td>
                    <td style={{ padding: "0.35rem", maxWidth: "250px" }} className="d-flex align-items-center gap-2 text-truncate">
                      {getFileIcon(att.fileName)}
                      <span className="text-truncate">{att.fileName}</span>
                    </td>
                    <td style={{ padding: "0.35rem", maxWidth: "200px" }}>
                      <span className="text-truncate d-block">{att.description || "-"}</span>
                    </td>
                    <td style={{ padding: "0.35rem" }}>{formatFileSize(att.fileSize)}</td>
                    <td style={{ padding: "0.35rem", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                      {formatDate(att.uploadedAt)} &nbsp;<span style={{ fontSize: "0.7rem", color: "#6c757d" }}>by {att.uploadedBy}</span>
                    </td>
                    <td style={{ padding: "0.35rem" }} className="text-center d-flex justify-content-center gap-1">
                      <OverlayTrigger overlay={<Tooltip>Download</Tooltip>}>
                        <Button variant="outline" size="sm" style={{ border: "1px solid black" }} onClick={() => handleDownload(att.attachmentId, att.fileName)}><Download size={16} /></Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                        <Button variant="outline-danger" size="sm" onClick={() => confirmDeleteAttachment(att.attachmentId)}><Trash2 size={16} /></Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>

      {/* Upload Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#3B82F6", color: "white" }}>
          <Modal.Title><Upload size={20} className="me-2"/> Upload Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {uploadError && <Alert variant="danger">{uploadError}</Alert>}

          <div {...getRootProps()} style={{ border: "2px dashed #3B82F6", borderRadius: 8, padding: 40, textAlign: "center", cursor: "pointer", backgroundColor: isDragActive ? "#e8f4f5" : "#f8f9fa"}}>
            <input {...getInputProps()} />
            <Upload size={20} className="mb-3" />
            {isDragActive ? <p>Drop file here...</p> : <p>Drag & drop a file here, or click to select</p>}
          </div>

          {selectedFile && <div className="mt-3 d-flex justify-content-between align-items-center p-3 bg-light rounded">
            <div className="d-flex align-items-center gap-2">{getFileIcon(selectedFile.name)} <span>{selectedFile.name} ({formatFileSize(selectedFile.size)})</span></div>
            <Button variant="outline-danger" size="sm" onClick={() => setSelectedFile(null)}><X size={16} /></Button>
          </div>}

          <Form.Group className="mt-3">
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500}/>
            <Form.Text>{description.length}/500 characters</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpload} disabled={!selectedFile || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this attachment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Attachments;
