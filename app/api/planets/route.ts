import { NextResponse } from "next/server";

import {
  fetchPlanetImageFromApi,
  fetchPlanetsFromApi,
} from "@/lib/solarSystemAPI/solarSystemAPI";

export async function GET() {
  try {
    const planets = await fetchPlanetsFromApi();
    const enrichedPlanets = await Promise.all(
      planets.map(async (planet) => {
        const externalImage = await fetchPlanetImageFromApi(planet.name);

        return {
          ...planet,
          image: externalImage ?? planet.image,
        };
      }),
    );

    return NextResponse.json(enrichedPlanets);
  } catch {
    return NextResponse.json(
      { message: "Failed to load planets from external API." },
      { status: 500 },
    );
  }
}
