import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limites: { fileSize: 5 * 1024 * 1024 }
});

export  const compressImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `${Date.now()}-${path.parse(req.file.originalname).name}.webp`;
  const outputPath = `uploads/${filename}`;

  await sharp(req.file.buffer)
  .resize({width: 1200, withoutEnlargement: true})
  .webp({quality: 80})
  .toFile(outputPath);

  req.file.filename = filename;
  req.file.path = outputPath;

  next();
};