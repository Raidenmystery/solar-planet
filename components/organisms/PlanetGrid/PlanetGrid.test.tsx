import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { buildPlanet } from "@/test/fixtures/planet";
import { PlanetGrid } from "./PlanetGrid";

describe("PlanetGrid", () => {
  it("renders a list of planet cards", () => {
    render(
      <PlanetGrid
        planets={[
          buildPlanet(),
          buildPlanet({ slug: "mars", name: "Mars", tagline: "Red world" }),
        ]}
      />,
    );

    expect(screen.getByRole("region", { name: "Solar planet list" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Earth", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mars", level: 3 })).toBeInTheDocument();
  });
});
