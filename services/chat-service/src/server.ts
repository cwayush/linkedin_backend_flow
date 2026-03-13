import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './chat/chat.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8085;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Gateway maps this to /api/chats
app.use('/api/chats', chatRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('Chat Service is up and running');
});

// Start Server
app.listen(port, () => {
  logger.info(`Chat Service listening on ${port}`);
});
