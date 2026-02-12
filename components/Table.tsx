import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EmployeeDataResponse } from "@/schema/employee-data-response";

export default function BasicTable({ data }: { data: EmployeeDataResponse }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Joining Date</TableCell>
            <TableCell>Active Status</TableCell>
            <TableCell>Projects Delivered</TableCell>
            <TableCell>Performance Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.salary}</TableCell>
              <TableCell>{row.joinDate}</TableCell>
              <TableCell>{row.isActive}</TableCell>
              <TableCell>{row.projects}</TableCell>
              <TableCell>{row.performanceRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
