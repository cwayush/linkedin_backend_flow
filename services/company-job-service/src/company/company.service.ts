import { companyRepository } from './company.repository';
import { CreateCompanyDto, CreateCategoryDto, CreateJobDto, ApplyJobDto } from './company.validator';
import { logger } from '../utils/logger';
import { MESSAGES } from 'shared';

export class CompanyService {
  async createCompany(data: CreateCompanyDto) {
    logger.info(`Creating company: ${data.name}`);
    return companyRepository.createCompany(data);
  }

  async getCompanies() {
    logger.info(`Fetching companies`);
    return companyRepository.getCompanies();
  }

  async getCompanyById(id: number) {
    logger.info(`Fetching company ${id}`);
    const company = await companyRepository.getCompanyById(id);
    if (!company) throw new Error(MESSAGES.USER.NOT_FOUND); 
    return company;
  }

  async createCategory(data: CreateCategoryDto) {
    logger.info(`Creating category: ${data.name}`);
    return companyRepository.createCategory(data);
  }

  async getCategories() {
    logger.info(`Fetching categories`);
    return companyRepository.getCategories();
  }

  async createJob(data: CreateJobDto) {
    logger.info(`Creating job: ${data.title}`);
    return companyRepository.createJob(data);
  }

  async getJobs() {
    logger.info(`Fetching jobs`);
    return companyRepository.getJobs();
  }

  async getJobById(id: number) {
    logger.info(`Fetching job ${id}`);
    const job = await companyRepository.getJobById(id);
    if (!job) throw new Error(MESSAGES.USER.NOT_FOUND);
    return job;
  }

  async applyForJob(userId: number, data: ApplyJobDto) {
    logger.info(`User ${userId} applying for job ${data.jobId}`);
    return companyRepository.applyForJob(userId, data);
  }

  async getApplications(jobId: number) {
    logger.info(`Fetching applications for job ${jobId}`);
    return companyRepository.getApplications(jobId);
  }
}

export const companyService = new CompanyService();
