import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TPlanet } from "@/types/planet";
import { PlanetSortOrder, PlanetUiStore } from "@/types/planetStore";

export const PLANETS_PER_PAGE = 5;

export const usePlanetStore = create<PlanetUiStore>()(
  persist(
    (set, get) => ({
      searchTerm: "",
      sortOrder: "asc",
      currentPage: 1,
      favoriteSlugs: [],
      setSearchTerm: (value, options) =>
        set((state) => {
          if (state.searchTerm === value) {
            return state;
          }

          return {
            searchTerm: value,
            currentPage: options?.resetPage === false ? state.currentPage : 1,
          };
        }),
      setSortOrder: (value, options) =>
        set((state) => {
          if (state.sortOrder === value) {
            return state;
          }

          return {
            sortOrder: value,
            currentPage: options?.resetPage === false ? state.currentPage : 1,
          };
        }),
      setCurrentPage: (value) =>
        set((state) => {
          const safeValue = Math.max(1, Math.floor(value));
          return state.currentPage === safeValue ? state : { currentPage: safeValue };
        }),
      toggleFavorite: (slug) =>
        set((state) => {
          const exists = state.favoriteSlugs.includes(slug);

          return {
            favoriteSlugs: exists
              ? state.favoriteSlugs.filter((item) => item !== slug)
              : [...state.favoriteSlugs, slug],
          };
        }),
      isFavorite: (slug) => get().favoriteSlugs.includes(slug),
    }),
    {
      name: "planet-ui-store",
      partialize: (state) => ({ favoriteSlugs: state.favoriteSlugs }),
    },
  ),
);

export const filterPlanetsBySearch = (
  planets: TPlanet[],
  searchTerm: string,
): TPlanet[] => {
  const text = searchTerm.trim().toLowerCase();

  if (!text) {
    return planets;
  }

  return planets.filter((planet) => {
    const value = `${planet.name} ${planet.tagline}`.toLowerCase();
    return value.includes(text);
  });
};

export const sortPlanetsByName = (
  planets: TPlanet[],
  sortOrder: PlanetSortOrder,
): TPlanet[] => {
  const multiplier = sortOrder === "asc" ? 1 : -1;

  return [...planets].sort((left, right) => {
    return left.name.localeCompare(right.name) * multiplier;
  });
};

export const paginatePlanets = (planets: TPlanet[], currentPage: number): TPlanet[] => {
  const page = Math.max(1, Math.floor(currentPage));
  const start = (page - 1) * PLANETS_PER_PAGE;
  return planets.slice(start, start + PLANETS_PER_PAGE);
};

export const getTotalPages = (totalItems: number): number => {
  return Math.max(1, Math.ceil(totalItems / PLANETS_PER_PAGE));
};

export const findPlanetBySlug = (planets: TPlanet[], slug: string): TPlanet | undefined =>
  planets.find((planet) => planet.slug === slug);
