import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

const services = {
  '/auth': 'http://auth-service:8081',
  '/api/users': 'http://user-service:8082',
  '/api/posts': 'http://post-service:8083',
  '/api/company': 'http://company-job-service:8084',
  '/api/category': 'http://company-job-service:8084',
  '/api/jobs': 'http://company-job-service:8084',
  '/api/chats': 'http://chat-service:8085',
  '/api/files': 'http://file-service:8086'
};

// Mount proxies
Object.entries(services).forEach(([route, target]) => {
  app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
});

app.get('/health', (req, res) => {
    res.status(200).send('API Gateway is up and running');
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
