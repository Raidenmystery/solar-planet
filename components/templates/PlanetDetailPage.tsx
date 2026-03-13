"use client";

import { PlanetDetails } from "@/components/organisms/PlanetDetails";
import { PageShell } from "@/components/templates/PageShell";
import { usePlanetsQuery } from "@/hooks/usePlanetsQuery";
import { findPlanetBySlug } from "@/store/planetStore";

type PlanetDetailPageProps = {
  slug: string;
};

export function PlanetDetailPage({ slug }: PlanetDetailPageProps) {
  const { data: planets = [], isPending, isError, error } = usePlanetsQuery();
  const planet = findPlanetBySlug(planets, slug);

  if (isPending) {
    return (
      <PageShell>
        <p className="mt-8 text-sm text-slate-200">Loading planet details...</p>
      </PageShell>
    );
  }

  if (isError) {
    return (
      <PageShell>
        <div className="mt-8 rounded-xl border border-red-300/70 bg-red-950/20 px-4 py-3 text-sm text-red-100">
          Could not load planet details. {error instanceof Error ? error.message : "Unexpected error."}
        </div>
      </PageShell>
    );
  }

  if (!planet) {
    return (
      <PageShell>
        <div className="mt-8 rounded-xl border border-white/20 bg-slate-900/60 px-4 py-4 text-slate-100">
          Planet not found.
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PlanetDetails planet={planet} />
    </PageShell>
  );
}
