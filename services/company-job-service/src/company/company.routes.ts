import { Router } from 'express';
import { companyController } from './company.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public Routes
router.get('/companies', companyController.getCompanies.bind(companyController));
router.get('/companies/:id', companyController.getCompanyById.bind(companyController));
router.get('/categories', companyController.getCategories.bind(companyController));
router.get('/jobs', companyController.getJobs.bind(companyController));
router.get('/jobs/:id', companyController.getJobById.bind(companyController));

// Protected Routes
router.use(authenticateToken);
router.post('/companies', companyController.createCompany.bind(companyController));
router.post('/categories', companyController.createCategory.bind(companyController));
router.post('/jobs', companyController.createJob.bind(companyController));
router.post('/apply', companyController.applyForJob.bind(companyController));
router.get('/applications/:id', companyController.getApplications.bind(companyController));

export default router;
