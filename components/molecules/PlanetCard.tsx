"use client";

import Image from "next/image";
import Link from "next/link";

import { Pill } from "@/components/atoms/Pill";
import { usePlanetStore } from "@/store/planetStore";
import { Planet } from "@/types/planet";

type PlanetCardProps = {
  planet: Planet;
};

export function PlanetCard({ planet }: PlanetCardProps) {
  const isFavorite = usePlanetStore((state) => state.isFavorite(planet.slug));

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b ${planet.cardGradient} p-5 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/60`}
    >
      <Link
        href={`/planets/${planet.slug}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
      >
        <span className="sr-only">View details for {planet.name}</span>
      </Link>

      <div className="relative z-0 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>{planet.tagline}</Pill>
          {isFavorite ? (
            <Pill
              variant="favorite"
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              }
            >
              Favorite
            </Pill>
          ) : null}
        </div>
        <Image
          src={planet.image}
          alt={`Image of ${planet.name}`}
          width={80}
          height={80}
          className="h-16 w-16 rounded-full border border-white/15 bg-black/20 object-cover p-1 sm:h-20 sm:w-20"
        />
      </div>

      <h3 className="relative z-0 mt-5 text-2xl font-semibold tracking-tight text-slate-950">
        {planet.name}
      </h3>
      <p className="relative z-0 mt-2 text-sm leading-6 text-slate-800">
        {planet.shortDescription}
      </p>
      <p className="relative z-0 mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-900/90">
        Open detail view
      </p>
    </article>
  );
}
