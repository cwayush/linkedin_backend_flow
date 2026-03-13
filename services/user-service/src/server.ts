import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './user/user.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8082;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Note: In the API gateway, we prefix these with /api/users
app.use('/api/users', userRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('User Service is up and running');
});

// Start Server
app.listen(port, () => {
    logger.info(`User Service listening on port ${port}`);
});
