import React, { useState, useEffect, useCallback } from "react";
import {Card,Button, Modal,Form,Table,Spinner,Alert, OverlayTrigger, Tooltip,} from "react-bootstrap";
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
} from "../services/Common/AttachmentServices";

interface KiduAttachmentsProps {
  tableName: string;
  recordId: string | number;
}

const PRIMARY_COLOR = "#18575A";

const KiduAttachments: React.FC<KiduAttachmentsProps> = ({ tableName, recordId }) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // 📦 Utilities
  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getFileIcon = (fileName: string): JSX.Element => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const icons: Record<string, JSX.Element> = {
      pdf: <FileText size={18} className="text-danger" />,
      xls: <FileSpreadsheet size={18} className="text-success" />,
      xlsx: <FileSpreadsheet size={18} className="text-success" />,
      doc: <FileText size={18} className="text-primary" />,
      docx: <FileText size={18} className="text-primary" />,
      png: <FileImage size={18} className="text-warning" />,
      jpg: <FileImage size={18} className="text-warning" />,
      jpeg: <FileImage size={18} className="text-warning" />,
      gif: <FileImage size={18} className="text-warning" />,
      zip: <FileArchive size={18} className="text-secondary" />,
      rar: <FileArchive size={18} className="text-secondary" />,
      mp3: <FileAudio size={18} className="text-info" />,
      wav: <FileAudio size={18} className="text-info" />,
      mp4: <FileVideo size={18} className="text-info" />,
      mov: <FileVideo size={18} className="text-info" />,
      avi: <FileVideo size={18} className="text-info" />,
      json: <FileJson size={18} className="text-muted" />,
      js: <FileCode size={18} className="text-purple-600" />,
      jsx: <FileCode size={18} className="text-purple-600" />,
      ts: <FileCode size={18} className="text-purple-600" />,
      tsx: <FileCode size={18} className="text-purple-600" />,
      html: <FileCode size={18} className="text-purple-600" />,
      css: <FileCode size={18} className="text-purple-600" />,
    };
    return icons[ext || ""] || <FileType size={18} className="text-dark" />;
  };

  // ⚙️ API logic
  const fetchAttachments = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await getAttachments(tableName, recordId);
      setAttachments(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load attachments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return setUploadError("Please select a file to upload");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("File", selectedFile);
      formData.append("TableName", tableName);
      formData.append("RecordId", String(recordId));
      if (description) formData.append("Description", description);

      await uploadAttachment(formData);
      await fetchAttachments();
      handleCloseModal();
    } catch {
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    const deletedBy = localStorage.getItem("userName") || "Unknown User";
    await deleteAttachment(id, deletedBy);
    fetchAttachments();
  };

  const handleDownload = (id: number, name: string): void => {
    downloadAttachment(id, name);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedFile(null);
    setDescription("");
    setUploadError(null);
  };

  // 🧱 Dropzone setup
  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length) setSelectedFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: (rejections) =>
      setUploadError(rejections[0]?.errors[0]?.message || "Invalid file"),
  });

  useEffect(() => {
    if (tableName && recordId) fetchAttachments();
  }, [tableName, recordId]);

  // 🎨 Render helpers
  const EmptyState: React.FC = () => (
    <div className="text-center py-4 text-muted">
      <FileText size={42} className="mb-2" />
      <p>No attachments yet. Click <b>Add Attachment</b> to upload.</p>
    </div>
  );

  const UploadModal: React.FC = () => (
    <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
      <Modal.Header closeButton style={{ background: PRIMARY_COLOR, color: "white" }}>
        <Modal.Title className="d-flex align-items-center gap-2">
          <Upload size={18} /> Upload Attachment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploadError && <Alert variant="danger">{uploadError}</Alert>}
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${PRIMARY_COLOR}`,
            borderRadius: 8,
            padding: 40,
            textAlign: "center",
            background: isDragActive ? "#E8F5F5" : "#F8F9FA",
          }}
        >
          <input {...getInputProps()} />
          <Upload size={20} color={PRIMARY_COLOR} className="mb-2" />
          <p className="fw-semibold mb-0">
            {isDragActive ? "Drop file here..." : "Drag & drop or click to select"}
          </p>
          <small className="text-muted">Max file size: 10MB</small>
        </div>

        {selectedFile && (
          <div className="mt-3 p-3 bg-light rounded d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              {getFileIcon(selectedFile.name)}
              <div>
                <p className="mb-0 fw-medium">{selectedFile.name}</p>
                <small className="text-muted">{formatFileSize(selectedFile.size)}</small>
              </div>
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => setSelectedFile(null)}>
              <X size={14} />
            </Button>
          </div>
        )}

        <Form.Group className="mt-3">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
          <Form.Text muted>{description.length}/500 characters</Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          style={{ background: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
          disabled={!selectedFile || uploading}
          onClick={handleUpload}
        >
          {uploading ? (
            <>
              <Spinner size="sm" className="me-2" /> Uploading...
            </>
          ) : (
            <>
              <Upload size={14} className="me-2" /> Upload
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Card className="mt-4 shadow-sm" style={{ background: "#FAFAFA" }}>
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        style={{ background: PRIMARY_COLOR, color: "white" }}
      >
        <h6 className="mb-0 fw-semibold">Attachments</h6>
        <Button
          size="sm"
          variant="light"
          className="d-flex align-items-center gap-2 fw-semibold"
          onClick={() => setShowModal(true)}
        >
          <Upload size={14} /> Add Attachment
        </Button>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : attachments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-responsive">
            <Table hover bordered size="sm" className="align-middle mb-0">
              <thead style={{ background: "#E9ECEF" }}>
                <tr>
                  <th>#</th>
                  <th>File</th>
                  <th>Description</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attachments.map((a, i) => (
                  <tr key={a.attachmentId}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {getFileIcon(a.fileName)}
                        <span className="text-truncate" style={{ maxWidth: 220 }}>
                          {a.fileName}
                        </span>
                      </div>
                    </td>
                    <td className="text-truncate" style={{ maxWidth: 300 }}>
                      {a.description || "-"}
                    </td>
                    <td>{formatFileSize(a.fileSize)}</td>
                    <td>
                      <small className="text-muted">
                        {formatDate(a.uploadedAt)} <br />by {a.uploadedBy}
                      </small>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-1">
                        <OverlayTrigger overlay={<Tooltip>Download</Tooltip>}>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ border: `1px solid ${PRIMARY_COLOR}` }}
                            onClick={() => handleDownload(a.attachmentId, a.fileName)}
                          >
                            <Download size={14} color={PRIMARY_COLOR} />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(a.attachmentId)}
                          >
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

      <UploadModal />
    </Card>
  );
};

export default KiduAttachments;
