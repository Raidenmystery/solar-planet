import { PlanetCard } from "@/components/molecules/PlanetCard";
import { Planet } from "@/types/planet";

type PlanetGridProps = {
  planets: Planet[];
};

export function PlanetGrid({ planets }: PlanetGridProps) {
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
