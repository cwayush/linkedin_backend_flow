import { Request, Response } from 'express';
import { companyService } from './company.service';
import { createCompanySchema, createCategorySchema, createJobSchema, applyJobSchema } from './company.validator';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { HTTP_STATUS, MESSAGES } from 'shared';

export class CompanyController {
  // COMPANIES
  async createCompany(req: AuthRequest, res: Response) {
    try {
      const data = createCompanySchema.parse(req.body);
      const company = await companyService.createCompany(data);
      res.status(HTTP_STATUS.CREATED).json(company);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Create Company: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Create company failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getCompanies(req: Request, res: Response) {
    try {
      const companies = await companyService.getCompanies();
      res.json(companies);
    } catch (err: any) {
      logger.error(`Fetch companies failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getCompanyById(req: Request, res: Response) {
    try {
      const companyId = parseInt(req.params.id as string);
      const company = await companyService.getCompanyById(companyId);
      res.json(company);
    } catch (err: any) {
      logger.error(`Fetch company failed: ${err.message}`);
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
  }

  // CATEGORIES
  async createCategory(req: AuthRequest, res: Response) {
    try {
      const data = createCategorySchema.parse(req.body);
      const cat = await companyService.createCategory(data);
      res.status(HTTP_STATUS.CREATED).json(cat);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Create Category: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Create category failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const cats = await companyService.getCategories();
      res.json(cats);
    } catch (err: any) {
      logger.error(`Fetch categories failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  // JOBS
  async createJob(req: AuthRequest, res: Response) {
    try {
      const data = createJobSchema.parse(req.body);
      const job = await companyService.createJob(data);
      res.status(HTTP_STATUS.CREATED).json(job);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Create Job: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Create job failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getJobs(req: Request, res: Response) {
    try {
      const jobs = await companyService.getJobs();
      res.json(jobs);
    } catch (err: any) {
      logger.error(`Fetch jobs failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getJobById(req: Request, res: Response) {
    try {
      const jobId = parseInt(req.params.id as string);
      const job = await companyService.getJobById(jobId);
      res.json(job);
    } catch (err: any) {
      logger.error(`Fetch job failed: ${err.message}`);
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
  }

  // APPLICATIONS
  async applyForJob(req: AuthRequest, res: Response) {
    try {
      const data = applyJobSchema.parse(req.body);
      const application = await companyService.applyForJob(req.user.userId, data);
      res.status(HTTP_STATUS.CREATED).json(application);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Apply Job: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Apply for job failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getApplications(req: AuthRequest, res: Response) {
    try {
      const jobId = parseInt(req.params.id as string);
      const apps = await companyService.getApplications(jobId);
      res.json(apps);
    } catch (err: any) {
      logger.error(`Fetch applications failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }
}

export const companyController = new CompanyController();
