import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fileRoutes from './file/file.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8086;

// Middleware
app.use(cors());
app.use(express.json());
// Serve the uploads directory statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
// Gateway expected to map this to /api/files
app.use('/', fileRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('File Service is up and running');
});

// Start Server
app.listen(port, () => {
    logger.info(`File Service listening on port ${port}`);
});
