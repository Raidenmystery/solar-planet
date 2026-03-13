import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { buildPlanet } from "@/test/fixtures/planet";
import { usePlanetsQuery } from "@/hooks/usePlanetsQuery";
import { PlanetDetailPage } from "./PlanetDetailPage";

vi.mock("@/hooks/usePlanetsQuery", () => ({
  usePlanetsQuery: vi.fn(),
}));

describe("PlanetDetailPage", () => {
  it("renders loading state", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [],
      isPending: true,
      isError: false,
      error: null,
    } as never);

    render(<PlanetDetailPage slug="earth" />);

    expect(screen.getByText("Loading planet details...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [],
      isPending: false,
      isError: true,
      error: new Error("Boom"),
    } as never);

    render(<PlanetDetailPage slug="earth" />);

    expect(screen.getByText(/Could not load planet details/i)).toBeInTheDocument();
  });

  it("renders not found state", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
      error: null,
    } as never);

    render(<PlanetDetailPage slug="earth" />);

    expect(screen.getByText("Planet not found.")).toBeInTheDocument();
  });

  it("renders planet details when data exists", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [buildPlanet()],
      isPending: false,
      isError: false,
      error: null,
    } as never);

    render(<PlanetDetailPage slug="earth" />);

    expect(screen.getByRole("heading", { name: "Earth", level: 1 })).toBeInTheDocument();
  });
});
