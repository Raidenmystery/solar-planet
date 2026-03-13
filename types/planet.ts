export type PlanetStat = {
  label: string;
  value: string;
};

export type PlanetFactSection = {
  title: string;
  stats: PlanetStat[];
};

export type Planet = {
  apiId: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  cardGradient: string;
  atmosphere: string[];
  factSections: PlanetFactSection[];
};
