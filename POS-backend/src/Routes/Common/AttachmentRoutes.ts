// Backend: Routes/Common/AttachmentRoutes.ts
import express from "express";
import { AttachmentController } from "../../Controllers/Common/AttachmentController";
import { upload as MulterdMiddleware } from "../../Middlewares/MulterMiddleware";

const router = express.Router();

router.get("/:tableName/:recordId", AttachmentController.getByTableAndRecord);
router.post("/upload", MulterdMiddleware.single("file"), AttachmentController.upload);
router.get("/download/:id", AttachmentController.download);
router.delete("/:id", AttachmentController.delete);

export default router;
