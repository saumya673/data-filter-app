"use client";

import { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./Table.css";
import Filter from "../Filter/Filter";

import { useEmployeeDataStore } from "@/stores/employeeDataStore";
import { useNameEmailFilterStore } from "@/stores/filters/nameEmailFilterStore";
import { useDepartmentFilterStore } from "@/stores/filters/departmentFilterStore";
import { useRoleFilterStore } from "@/stores/filters/roleFilterStore";
import { useSalaryFilterStore } from "@/stores/filters/salaryFilterStore";
import { useJoinDateFilterStore } from "@/stores/filters/joinDateFilterStore";
import { useActiveFilterStore } from "@/stores/filters/activeFilterStore";
import { useProjectsFilterStore } from "@/stores/filters/projectsFilterStore";
import { useLastReviewFilterStore } from "@/stores/filters/lastReviewFilterStore";
import { usePerformanceFilterStore } from "@/stores/filters/performanceFilterStore";

import { filterEmployees } from "@/stores/filterEmployees";

export default function BasicTable() {
  const employees = useEmployeeDataStore((s) => s.employees);
  const isLoading = useEmployeeDataStore((s) => s.isLoading);

  // Read ONLY applied values
  const nameApplied = useNameEmailFilterStore((s) => s.applied);
  const deptApplied = useDepartmentFilterStore((s) => s.applied);
  const roleApplied = useRoleFilterStore((s) => s.applied);
  const salaryApplied = useSalaryFilterStore((s) => s.applied);
  const joinApplied = useJoinDateFilterStore((s) => s.applied);
  const activeApplied = useActiveFilterStore((s) => s.applied);
  const projectsApplied = useProjectsFilterStore((s) => s.applied);
  const reviewApplied = useLastReviewFilterStore((s) => s.applied);
  const perfApplied = usePerformanceFilterStore((s) => s.applied);

  const data = useMemo(() => {
    return filterEmployees(employees, {
      query: nameApplied.query,
      departments: deptApplied.selected,
      roles: roleApplied.selected,
      salaryMin: salaryApplied.min,
      salaryMax: salaryApplied.max,
      joinFromMs: joinApplied.fromMs,
      joinToMs: joinApplied.toMs,
      active: activeApplied.value,
      projectsMode: projectsApplied.mode,
      projectsMin: projectsApplied.min,
      projectsMax: projectsApplied.max,
      projectsExact: projectsApplied.exact,
      reviewFromMs: reviewApplied.fromMs,
      reviewToMs: reviewApplied.toMs,
      perfMode: perfApplied.mode,
      perfMin: perfApplied.min,
      perfMax: perfApplied.max,
      perfExact: perfApplied.exact,
    });
  }, [
    employees,
    nameApplied,
    deptApplied,
    roleApplied,
    salaryApplied,
    joinApplied,
    activeApplied,
    projectsApplied,
    reviewApplied,
    perfApplied,
  ]);

  if (isLoading) return <div className="message">Loading...</div>;
  if (data.length === 0) return <div className="message">No results</div>;

  const tableCellStyle = {
    border: "none",
    boxShadow: "inset 0 -6px 4px -4px rgba(0,0,0,0.25)",
  };
  const tableHeadCellStyle = { border: "none", fontWeight: "bold" };

  return (
    <>
      <Filter />

      <Paper sx={{ boxShadow: "0px 0px 20px rgb(235, 182, 7)", m: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                className="table-row"
                sx={{ fontWeight: 20, border: "none" }}
              >
                <TableCell sx={tableHeadCellStyle}>Name</TableCell>
                <TableCell sx={tableHeadCellStyle}>Email</TableCell>
                <TableCell sx={tableHeadCellStyle}>Department</TableCell>
                <TableCell sx={tableHeadCellStyle}>Role</TableCell>
                <TableCell sx={tableHeadCellStyle}>Salary</TableCell>
                <TableCell sx={tableHeadCellStyle}>Joining Date</TableCell>
                <TableCell sx={tableHeadCellStyle}>Active Status</TableCell>
                <TableCell sx={tableHeadCellStyle}>
                  Projects Delivered
                </TableCell>
                <TableCell sx={tableHeadCellStyle}>
                  Performance Rating
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="table-body">
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={tableCellStyle}>{row.name}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.email}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.department}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.role}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.salary}</TableCell>
                  <TableCell sx={tableCellStyle}>{row.joinDate}</TableCell>
                  <TableCell sx={tableCellStyle}>
                    {row.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell sx={tableCellStyle}>{row.projects}</TableCell>
                  <TableCell sx={tableCellStyle}>
                    {row.performanceRating}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
