import { Planet, PlanetFactSection } from "@/types/planet";
import { ApiBody, ApiResponse } from "@/types/solarSystemApi";
import {
  API_URL,
  NASA_IMAGE_SEARCH_URL,
  VISUALS,
} from "@/lib/solarSystemAPI/solarSystemAPI.constants";

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function format(value: number | null | undefined, suffix = ""): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Unknown";
  }

  const text = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    value,
  );
  return suffix ? `${text} ${suffix}` : text;
}

function formatScientific(
  source:
    | { massValue: number; massExponent: number }
    | { volValue: number; volExponent: number }
    | undefined,
): string {
  if (!source) {
    return "Unknown";
  }

  if ("massValue" in source) {
    return `${source.massValue} x10^${source.massExponent}`;
  }

  return `${source.volValue} x10^${source.volExponent}`;
}

function sections(body: ApiBody): PlanetFactSection[] {
  return [
    {
      title: "Orbital Profile",
      stats: [
        { label: "Semi-major Axis", value: format(body.semimajorAxis, "km") },
        { label: "Perihelion", value: format(body.perihelion, "km") },
        { label: "Aphelion", value: format(body.aphelion, "km") },
      ],
    },
    {
      title: "Physical Characteristics",
      stats: [
        { label: "Radius", value: format(body.meanRadius, "km") },
        { label: "Gravity", value: format(body.gravity, "m/s2") },
        { label: "Density", value: format(body.density, "g/cm3") },
      ],
    },
    {
      title: "Scientific Data",
      stats: [
        { label: "Mass", value: formatScientific(body.mass) },
        { label: "Volume", value: formatScientific(body.vol) },
        { label: "Known Moons", value: String(body.moons?.length ?? 0) },
      ],
    },
  ];
}

function toPlanet(body: ApiBody): Planet {
  const slug = slugify(body.englishName);
  const visual = VISUALS[slug];

  return {
    apiId: body.id,
    slug,
    name: body.englishName,
    tagline: visual?.tagline ?? "Solar world",
    shortDescription: `${body.englishName} has a mean radius of ${format(body.meanRadius, "km")} and gravity of ${format(body.gravity, "m/s2")}.`,
    longDescription: `${body.englishName} orbits the Sun every ${format(body.sideralOrbit, "days")} and rotates in about ${format(body.sideralRotation, "hours")}. This data is loaded from the Le Systeme Solaire public API.`,
    image: visual?.image ?? "/globe.svg",
    cardGradient: visual?.cardGradient ?? "from-slate-500/30 to-slate-300/20",
    atmosphere: visual?.atmosphere ?? ["Unknown"],
    factSections: sections(body),
  };
}

function getSolarApiHeaders(): HeadersInit | undefined {
  const token = process.env.NEXT_PUBLIC_SOLAR_API_TOKEN;

  if (!token) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchPlanetsFromApi(): Promise<Planet[]> {
  const response = await fetch(API_URL, {
    headers: getSolarApiHeaders(),
    next: { revalidate: 60 * 60 * 6 },
  });

  if (!response.ok) {
    throw new Error("Failed to load planets from external API.");
  }

  const data = (await response.json()) as ApiResponse;
  const planets = data.bodies.map(toPlanet);

  return planets;
}

type NasaImageResponse = {
  collection?: {
    items?: Array<{
      links?: Array<{ href: string }>;
    }>;
  };
};

export async function fetchPlanetImageFromApi(planetName: string): Promise<string | null> {
  const query = encodeURIComponent(`${planetName} planet`);
  const url = `${NASA_IMAGE_SEARCH_URL}?q=${query}&media_type=image`;

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as NasaImageResponse;
  return data.collection?.items?.[0]?.links?.[0]?.href ?? null;
}
