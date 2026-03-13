import { z } from 'zod';

export const updateUserInfoSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  professionalSummary: z.string().optional(),
  headLine: z.string().optional(),
  dob: z.string().optional(), // Using string for easy date parsing
});

export const addExperienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional().nullable(),
  description: z.string().optional(),
});

export type UpdateUserInfoDto = z.infer<typeof updateUserInfoSchema>;
export type AddExperienceDto = z.infer<typeof addExperienceSchema>;
