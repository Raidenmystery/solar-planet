import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { usePlanetStore } from "@/store/planetStore";
import { buildPlanet } from "@/test/fixtures/planet";
import { PlanetCard } from "./PlanetCard";

describe("PlanetCard", () => {
  beforeEach(() => {
    usePlanetStore.setState({ favoriteSlugs: [] });
  });

  it("renders planet summary and detail link", () => {
    const planet = buildPlanet();

    render(<PlanetCard planet={planet} />);

    expect(screen.getByRole("heading", { name: "Earth", level: 3 })).toBeInTheDocument();
    expect(screen.getByText("Blue world")).toBeInTheDocument();
    expect(screen.getByText("A rocky world with oceans.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details for Earth" })).toHaveAttribute(
      "href",
      "/planets/earth",
    );
    expect(screen.getByRole("img", { name: "Image of Earth" })).toBeInTheDocument();
  });

  it("shows favorite badge when planet is in favorites", () => {
    usePlanetStore.setState({ favoriteSlugs: ["earth"] });

    render(<PlanetCard planet={buildPlanet()} />);

    expect(screen.getByText("Favorite")).toBeInTheDocument();
  });
});
