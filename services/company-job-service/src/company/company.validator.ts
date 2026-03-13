import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  logoUrl: z.string().url().optional().or(z.literal('')),
  bannerUrl: z.string().url().optional().or(z.literal(''))
});

export const createCategorySchema = z.object({
  name: z.string().min(1)
});

export const createJobSchema = z.object({
  companyId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  salary: z.string().optional()
});

export const applyJobSchema = z.object({
  jobId: z.number().int().positive(),
  resumeUrl: z.string().url()
});

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type CreateJobDto = z.infer<typeof createJobSchema>;
export type ApplyJobDto = z.infer<typeof applyJobSchema>;
