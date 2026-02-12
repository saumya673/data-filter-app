"use client";

import Table from "@/components/Table/Table";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import "./page.css";

export default function Home() {
  const employeeData = useEmployeeData();
  return (
    <div>
      <div className="title">Employee Data Table</div>
      <div className="table-wrapper">
        <Table data={employeeData.data} isLoading={employeeData.isLoading} />
      </div>
    </div>
  );
}
