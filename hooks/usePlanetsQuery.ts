"use client";

import { useQuery } from "@tanstack/react-query";

import { Planet } from "@/types/planet";

async function fetchPlanetsFromRoute(): Promise<Planet[]> {
  const response = await fetch("/api/planets");

  if (!response.ok) {
    throw new Error("Failed to load planets.");
  }

  return (await response.json()) as Planet[];
}

export function usePlanetsQuery() {
  return useQuery({
    queryKey: ["planets"],
    queryFn: fetchPlanetsFromRoute,
  });
}
