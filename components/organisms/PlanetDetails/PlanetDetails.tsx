"use client";

import Image from "next/image";
import Link from "next/link";

import { SectionTitle } from "@/components/atoms/SectionTitle";
import { PlanetStatItem } from "@/components/molecules/PlanetStatItem";
import { usePlanetStore } from "@/store/planetStore";
import { TPlanetDetails } from "./PlanetDetails.types";


export function PlanetDetails({ planet }: TPlanetDetails) {
  // --- Hooks -----------------------------------------------------------------
  const isFavorite = usePlanetStore((state) => state.isFavorite(planet.slug));
  const toggleFavorite = usePlanetStore((state) => state.toggleFavorite);
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  // --- END: Data and handlers ------------------------------------------------

  return (
    <section className="mt-8 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center rounded-md border border-cyan-300/80 bg-white/70 px-3 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-900 shadow-sm transition hover:bg-white hover:text-cyan-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700"
      >
        Back to planets
      </Link>

      <div className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30 lg:grid-cols-[240px,1fr] lg:p-10">
        <Image
          src={planet.image}
          alt={`Planet ${planet.name}`}
          width={240}
          height={240}
          priority
          className="mx-auto h-48 w-48 rounded-full border border-white/15 bg-black/20 p-2 lg:h-60 lg:w-60"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            {planet.tagline}
          </p>
          <button
            type="button"
            onClick={() => toggleFavorite(planet.slug)}
            className="mt-3 rounded-lg border border-cyan-300/50 bg-cyan-100/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-100/20"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {planet.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
            {planet.longDescription}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {planet.atmosphere.map((gas) => (
              <span
                key={gas}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200"
              >
                {gas}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {planet.factSections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-white/10 bg-slate-900/55 p-5"
          >
            <SectionTitle>{section.title}</SectionTitle>
            <dl className="mt-3">
              {section.stats.map((stat) => (
                <PlanetStatItem key={stat.label} stat={stat} />
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
