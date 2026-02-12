import { EmployeeDataResponse, EmployeeDataResponseSchema } from "@/schema/employee-data-response";


export function validateEmployeeDataResponse(data:EmployeeDataResponse): EmployeeDataResponse {
  const result = EmployeeDataResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid employee data response");
  }
  return result.data;
}