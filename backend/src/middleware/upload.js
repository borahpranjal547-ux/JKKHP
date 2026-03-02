import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'src/uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});

const allowed = ['application/pdf', 'image/jpeg', 'image/png'];

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowed.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Only PDF/JPG/PNG files are allowed'));
  }
});

export const getExt = (name) => path.extname(name);
