import { CreateCompanyDto, CreateCategoryDto, CreateJobDto, ApplyJobDto } from './company.validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CompanyRepository {
  // COMPANIES
  async createCompany(data: CreateCompanyDto) {
    return prisma.company.create({ data });
  }
  async getCompanies() {
    return prisma.company.findMany({ include: { locations: true } });
  }
  async getCompanyById(id: number) {
    return prisma.company.findUnique({
      where: { id },
      include: { locations: true, jobs: true }
    });
  }

  // CATEGORIES
  async createCategory(data: CreateCategoryDto) {
    return prisma.category.create({ data: { name: data.name } });
  }
  async getCategories() {
    return prisma.category.findMany();
  }

  // JOBS
  async createJob(data: CreateJobDto) {
    return prisma.job.create({ data });
  }
  async getJobs() {
    return prisma.job.findMany({ include: { company: true, category: true } });
  }
  async getJobById(id: number) {
    return prisma.job.findUnique({
      where: { id },
      include: { company: true, category: true }
    });
  }

  // APPLICATIONS
  async applyForJob(userId: number, data: ApplyJobDto) {
    return prisma.application.create({
      data: { jobId: data.jobId, userId, resumeUrl: data.resumeUrl }
    });
  }
  async getApplications(jobId: number) {
    return prisma.application.findMany({
      where: { jobId },
      include: { user: { select: { id: true, firstName: true, lastName: true, email: true } } }
    });
  }
}

export const companyRepository = new CompanyRepository();
