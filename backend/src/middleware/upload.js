import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'src/uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (_, file, cb) => {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
  cb(null, allowed.includes(file.mimetype));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});
