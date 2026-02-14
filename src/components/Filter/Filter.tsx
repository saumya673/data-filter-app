"use client";

import "./Filter.css";
import { Stack, Button, Typography } from "@mui/material";

import { useNameEmailFilterStore } from "@/stores/filters/nameEmailFilterStore";
import { useDepartmentFilterStore } from "@/stores/filters/departmentFilterStore";
import { useRoleFilterStore } from "@/stores/filters/roleFilterStore";
import { useSalaryFilterStore } from "@/stores/filters/salaryFilterStore";
import { useJoinDateFilterStore } from "@/stores/filters/joinDateFilterStore";
import { useActiveFilterStore } from "@/stores/filters/activeFilterStore";
import { useProjectsFilterStore } from "@/stores/filters/projectsFilterStore";
import { useLastReviewFilterStore } from "@/stores/filters/lastReviewFilterStore";
import { usePerformanceFilterStore } from "@/stores/filters/performanceFilterStore";

import { NameEmailFilterModal } from "./modals/NameEmailFilterModal";
import { DepartmentFilterModal } from "./modals/DepartmentFilterModal";
import { RoleFilterModal } from "./modals/RoleFilterModal";
import { SalaryFilterModal } from "./modals/SalaryFilterModal";
import { JoinDateFilterModal } from "./modals/JoinDateFilterModal";
import { ActiveFilterModal } from "./modals/ActiveFilterModal";
import { ProjectsFilterModal } from "./modals/ProjectsFilterModal";
import { LastReviewFilterModal } from "./modals/LastReviewFilterModal";
import { PerformanceFilterModal } from "./modals/PerformanceFilterModal";

export default function Filter() {
  const openName = useNameEmailFilterStore((s) => s.openModal);
  const openDept = useDepartmentFilterStore((s) => s.openModal);
  const openRole = useRoleFilterStore((s) => s.openModal);
  const openSalary = useSalaryFilterStore((s) => s.openModal);
  const openJoin = useJoinDateFilterStore((s) => s.openModal);
  const openActive = useActiveFilterStore((s) => s.openModal);
  const openProjects = useProjectsFilterStore((s) => s.openModal);
  const openReview = useLastReviewFilterStore((s) => s.openModal);
  const openPerf = usePerformanceFilterStore((s) => s.openModal);

  return (
    <>
      <Typography className="filter-text">Filter By</Typography>

      <Stack direction="row" spacing={1} sx={{ m: 2, flexWrap: "wrap" }}>
        <Button variant="outlined" onClick={openName}>
          Name / Email
        </Button>
        <Button variant="outlined" onClick={openDept}>
          Department
        </Button>
        <Button variant="outlined" onClick={openRole}>
          Role
        </Button>
        <Button variant="outlined" onClick={openSalary}>
          Salary
        </Button>
        <Button variant="outlined" onClick={openJoin}>
          Joining Date
        </Button>
        <Button variant="outlined" onClick={openActive}>
          Active
        </Button>
        <Button variant="outlined" onClick={openProjects}>
          Projects
        </Button>
        <Button variant="outlined" onClick={openReview}>
          Last Review
        </Button>
        <Button variant="outlined" onClick={openPerf}>
          Performance
        </Button>
      </Stack>

      {/* Modals */}
      <NameEmailFilterModal />
      <DepartmentFilterModal />
      <RoleFilterModal />
      <SalaryFilterModal />
      <JoinDateFilterModal />
      <ActiveFilterModal />
      <ProjectsFilterModal />
      <LastReviewFilterModal />
      <PerformanceFilterModal />
    </>
  );
}
