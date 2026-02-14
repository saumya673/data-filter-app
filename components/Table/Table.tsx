"use client";

import { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Alert, CircularProgress, Box, Typography } from "@mui/material";

import "./Table.css";
import { FilterBuilder } from "../Filter/DynamicFilter/FilterBuilder";

import { useEmployeeDataStore } from "@/stores/employeeDataStore";
import { useDynamicFilterStore } from "@/stores/dynamicFilterStore";
import { filterEmployeesDynamic } from "@/lib/filterLogic";

export default function BasicTable() {
  const { employees, isLoading, error } = useEmployeeDataStore();
  const { conditions } = useDynamicFilterStore();

  const data = useMemo(() => {
    return filterEmployeesDynamic(employees, conditions);
  }, [employees, conditions]);

  const tableCellStyle = {
    border: "none",
    boxShadow: "inset 0 -6px 4px -4px rgba(0,0,0,0.25)",
  };
  const tableHeadCellStyle = { border: "none", fontWeight: "bold" };

  if (error) {
    return <Alert severity="error">Error loading data: {error}</Alert>;
  }

  return (
    <>
      <FilterBuilder />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {data.length} of {employees.length} records
        </Typography>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : data.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography>No results found matching your filters.</Typography>
        </Paper>
      ) : (
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
                  <TableCell sx={tableHeadCellStyle}>Skills</TableCell>
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
                    <TableCell sx={tableCellStyle}>{row.skills.join(", ")}</TableCell>
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
      )}
    </>
  );
}
