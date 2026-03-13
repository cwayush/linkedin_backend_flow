import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './post/post.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8083;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Note: In the API gateway, we prefix these with /api/posts
app.use('/api/posts', postRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('Post Service is up and running');
});

// Start Server
app.listen(port, () => {
    logger.info(`Post Service listening on port ${port}`);
});
