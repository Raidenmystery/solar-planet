import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { usePlanetStore } from "@/store/planetStore";
import { buildPlanet } from "@/test/fixtures/planet";
import { PlanetDetails } from "./PlanetDetails";

describe("PlanetDetails", () => {
  beforeEach(() => {
    usePlanetStore.setState({ favoriteSlugs: [] });
  });

  it("renders detail information", () => {
    const planet = buildPlanet();

    render(<PlanetDetails planet={planet} />);

    expect(screen.getByRole("link", { name: "Back to planets" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("heading", { name: "Earth", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to favorites" })).toBeInTheDocument();
    expect(screen.getByText("Nitrogen")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Physical", level: 2 })).toBeInTheDocument();
  });

  it("toggles favorite status", async () => {
    const user = userEvent.setup();

    render(<PlanetDetails planet={buildPlanet()} />);

    await user.click(screen.getByRole("button", { name: "Add to favorites" }));

    expect(screen.getByRole("button", { name: "Remove from favorites" })).toBeInTheDocument();
  });
});
