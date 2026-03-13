import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth/auth.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('Auth Service is up and running');
});

// Start Server
app.listen(port, () => {
    logger.info(`Auth Service listening on port ${port}`);
});
