import { PlanetStat } from "@/types/planet";

type PlanetStatItemProps = {
  stat: PlanetStat;
};

export function PlanetStatItem({ stat }: PlanetStatItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <dt className="text-sm text-slate-300">{stat.label}</dt>
      <dd className="text-sm font-semibold text-white">{stat.value}</dd>
    </div>
  );
}
