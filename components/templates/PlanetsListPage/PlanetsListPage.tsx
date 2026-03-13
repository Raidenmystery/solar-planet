"use client";

import { Suspense, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PlanetGrid } from "@/components/organisms/PlanetGrid";
import { PageShell } from "@/components/templates/PageShell/PageShell";
import { usePlanetsQuery } from "@/hooks/usePlanetsQuery";
import {
  filterPlanetsBySearch,
  getTotalPages,
  paginatePlanets,
  sortPlanetsByName,
  usePlanetStore,
} from "@/store/planetStore";

function PlanetsListPageContent() {
  // --- Hooks -----------------------------------------------------------------
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: planets = [], isPending, isError, error } = usePlanetsQuery();

  const {
    searchTerm,
    sortOrder,
    currentPage,
    setSearchTerm,
    setSortOrder,
    setCurrentPage
  } = usePlanetStore((state) => state);
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const urlSearch = searchParams.get("search") ?? "";
  const urlSort = searchParams.get("sort") === "desc" ? "desc" : "asc";
  const rawUrlPage = Number(searchParams.get("page") ?? "1");
  const urlPage = Number.isFinite(rawUrlPage) && rawUrlPage > 0 ? Math.floor(rawUrlPage) : 1;
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const filteredPlanets = useMemo(() => {
    return filterPlanetsBySearch(planets, searchTerm);
  }, [planets, searchTerm]);

  const sortedPlanets = useMemo(() => {
    return sortPlanetsByName(filteredPlanets, sortOrder);
  }, [filteredPlanets, sortOrder]);

  const paginatedPlanets = useMemo(() => {
    return paginatePlanets(sortedPlanets, currentPage);
  }, [currentPage, sortedPlanets]);

  const totalPages = getTotalPages(sortedPlanets.length);
  // --- END: Data and handlers ------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  useEffect(() => {
    setSearchTerm(urlSearch, { resetPage: false });
    setSortOrder(urlSort, { resetPage: false });
    setCurrentPage(urlPage);
  }, [setCurrentPage, setSearchTerm, setSortOrder, urlPage, urlSearch, urlSort]);
  
  useEffect(() => {
    const nextParams = new URLSearchParams();
    
    if (searchTerm.trim()) {
      nextParams.set("search", searchTerm.trim());
    }
    
    if (sortOrder === "desc") {
      nextParams.set("sort", "desc");
    }
    
    if (currentPage > 1) {
      nextParams.set("page", String(currentPage));
    }
    
    const current = searchParams.toString();
    const next = nextParams.toString();
    
    if (current === next) {
      return;
    }
    
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [currentPage, pathname, router, searchParams, searchTerm, sortOrder]);
  

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, setCurrentPage, totalPages]);
  // --- END: Side effects ----------------------------------------------------- 

  return (
    <PageShell>
      <header className="max-w-3xl">
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Solar Planet List
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
          Planet data is fetched and cached with React Query. Zustand keeps UI
          state for search and card selection.
        </p>

        <label htmlFor="planet-search" className="mt-6 block text-sm font-semibold text-slate-700">
          Search planets
        </label>
        <input
          id="planet-search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by planet name"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300"
        />

        <label htmlFor="planet-sort" className="mt-4 block text-sm font-semibold text-slate-700">
          Sort by name
        </label>
        <select
          id="planet-sort"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value === "desc" ? "desc" : "asc")}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300"
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </header>

      {isPending && (
        <p className="mt-8 text-sm text-slate-600">Loading planets from API...</p>
      )}

      {isError && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load planet data. {error instanceof Error ? error.message : "Unexpected error."}
        </div>
      )}

      {(!isPending && !isError) && <PlanetGrid planets={paginatedPlanets} />}

      {(!isPending && !isError) && (
        <footer className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-slate-700">
            Page {currentPage} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </footer>
      )}
    </PageShell>
  );
}

export function PlanetsListPage() {
  return (
    <Suspense fallback={<p className="mt-8 text-sm text-slate-600">Loading planets...</p>}>
      <PlanetsListPageContent />
    </Suspense>
  );
}
