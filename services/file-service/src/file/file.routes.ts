import { Router } from 'express';
import { fileController } from './file.controller';
import { authenticateToken } from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// All routes require auth
router.use(authenticateToken);

router.post('/upload', upload.single('file'), fileController.uploadFile.bind(fileController));
router.post('/batch-delete', fileController.batchDelete.bind(fileController));
router.delete('/', fileController.deleteFile.bind(fileController));

export default router;
