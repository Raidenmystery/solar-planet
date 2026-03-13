"use client";

import { useQuery } from "@tanstack/react-query";

import { TPlanet } from "@/types/planet";

async function fetchPlanetsFromRoute(): Promise<TPlanet[]> {
  const response = await fetch("/api/planets");

  if (!response.ok) {
    throw new Error("Failed to load planets.");
  }

  return (await response.json()) as TPlanet[];
}

export function usePlanetsQuery() {
  return useQuery({
    queryKey: ["planets"],
    queryFn: fetchPlanetsFromRoute,
  });
}
