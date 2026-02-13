"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { employeeDataBackendUrl } from "@/lib/utils";
import { useEmployeeDataStore } from "@/stores/employeeDataStore";
import type { EmployeeDataResponse } from "@/schema/employee-data-response";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useEmployeeData() {
  const { data, error, isLoading } = useSWR<EmployeeDataResponse>(
    employeeDataBackendUrl,
    fetcher
  );

  const setEmployees = useEmployeeDataStore((s) => s.setEmployees);
  const setLoading = useEmployeeDataStore((s) => s.setLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (data) setEmployees(data);
  }, [data, setEmployees]);

  return { data: data ?? [], error, isLoading };
}
