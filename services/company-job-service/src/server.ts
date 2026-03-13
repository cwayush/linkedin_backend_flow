import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import companyRoutes from './company/company.routes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8084;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Note: In the API gateway, we prefix these with /api (so /api/companies)
app.use('/', companyRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).send('Company & Job Service is running');
});

// Start Server
app.listen(port, () => {
  logger.info(`Company & Job Service listening on port ${port}`);
});
