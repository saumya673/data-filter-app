import * as z from "zod";

export const EmployeeDataResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    department: z.string(),
    role: z.string(),
    salary: z.number(),
    joinDate: z.string(),
    isActive: z.boolean(),
    skills: z.array(z.string()),
    address: z.object({city: z.string(), state: z.string(), country: z.string(), }), projects: z.number(),
    lastReview: z.string(), 
    performanceRating: z.number(), 
}) );
    

export type EmployeeDataResponse = z.infer<typeof EmployeeDataResponseSchema>;