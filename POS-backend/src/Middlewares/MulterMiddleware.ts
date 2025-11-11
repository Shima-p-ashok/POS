// Backend: Middlewares/MulterMiddleware.ts
import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_ROOT = path.join(__dirname, "../../uploads");
if (!fs.existsSync(UPLOAD_ROOT)) fs.mkdirSync(UPLOAD_ROOT, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_ROOT),
  filename: (_req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

export const upload = multer({ storage });
