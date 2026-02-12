"use client";

import Table from "@/components/Table";
import { useEmployeeData } from "@/hooks/useEmployeeData";

export default function Home() {
  const employeeData = useEmployeeData();
  return (
    <div className="main-content">
      <h1>Employee Data Table</h1>
      <Table data={employeeData.data} />
    </div>
  );
}
