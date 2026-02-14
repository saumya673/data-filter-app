import type { EmployeeDataResponse } from "@/schema/employee-data-response";
import { parseDateMs } from "@/stores/filters/dateUtils";

export type CombinedAppliedFilters = {
  query: string;
  departments: string[];
  roles: string[];
  salaryMin?: number;
  salaryMax?: number;

  joinFromMs?: number;
  joinToMs?: number;

  active: "all" | "active" | "inactive";

  projectsMode: "range" | "exact";
  projectsMin: number;
  projectsMax: number;
  projectsExact?: number;

  reviewFromMs?: number;
  reviewToMs?: number;

  perfMode: "range" | "exact";
  perfMin: number;
  perfMax: number;
  perfExact?: number;
};

export function filterEmployees(rows: EmployeeDataResponse, f: CombinedAppliedFilters) {
  const q = f.query.trim().toLowerCase();

  return rows.filter((e) => {
    // 1) name/email
    if (q) {
      const hay = `${e.name} ${e.email}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    // 2) dept
    if (f.departments.length && !f.departments.includes(e.department)) return false;

    // 3) role
    if (f.roles.length && !f.roles.includes(e.role)) return false;

    // 4) salary
    if (typeof f.salaryMin === "number" && e.salary < f.salaryMin) return false;
    if (typeof f.salaryMax === "number" && e.salary > f.salaryMax) return false;

    // 5) join date
    if (f.joinFromMs || f.joinToMs) {
      const t = parseDateMs(e.joinDate);
      if (t === null) return false;
      if (f.joinFromMs && t < f.joinFromMs) return false;
      if (f.joinToMs && t > f.joinToMs) return false;
    }

    // 6) active
    if (f.active !== "all") {
      const want = f.active === "active";
      if (e.isActive !== want) return false;
    }

    // 7) projects
    if (f.projectsMode === "exact" && typeof f.projectsExact === "number") {
      if (e.projects !== f.projectsExact) return false;
    } else {
      if (e.projects < f.projectsMin || e.projects > f.projectsMax) return false;
    }

    // 8) last review
    if (f.reviewFromMs || f.reviewToMs) {
      const t = parseDateMs(e.lastReview);
      if (t === null) return false;
      if (f.reviewFromMs && t < f.reviewFromMs) return false;
      if (f.reviewToMs && t > f.reviewToMs) return false;
    }

    // 9) performance
    if (f.perfMode === "exact" && typeof f.perfExact === "number") {
      if (e.performanceRating !== f.perfExact) return false;
    } else {
      if (e.performanceRating < f.perfMin || e.performanceRating > f.perfMax) return false;
    }

    return true;
  });
}
