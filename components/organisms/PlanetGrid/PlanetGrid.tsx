import { PlanetCard } from "@/components/molecules/PlanetCard";
import { TPlanetGrid } from "./PlanetGrid.types";

export function PlanetGrid({ planets }: TPlanetGrid) {
  // --- Hooks -----------------------------------------------------------------
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
    <section aria-label="Solar planet list" className="mt-10">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {planets.map((planet) => (
          <PlanetCard key={planet.slug} planet={planet} />
        ))}
      </div>
    </section>
  );
}
