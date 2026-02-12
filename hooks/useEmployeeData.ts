"use client";

import useSWR from "swr";
import { employeeDataBackendUrl } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useEmployeeData() {
  const { data, error, isLoading } = useSWR(employeeDataBackendUrl, fetcher);

  return { data: data ?? [], error, isLoading };
}