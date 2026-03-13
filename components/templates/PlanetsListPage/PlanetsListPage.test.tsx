import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePlanetsQuery } from "@/hooks/usePlanetsQuery";
import { usePlanetStore } from "@/store/planetStore";
import { buildPlanet } from "@/test/fixtures/planet";
import { PlanetsListPage } from "./PlanetsListPage";

const navigationMocks = vi.hoisted(() => ({
  replace: vi.fn(),
  get: vi.fn((key: string) => {
    if (key === "search") {
      return "";
    }
    if (key === "sort") {
      return "asc";
    }
    if (key === "page") {
      return "1";
    }
    return null;
  }),
  toString: vi.fn(() => ""),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: navigationMocks.replace }),
  usePathname: () => "/",
  useSearchParams: () => ({
    get: navigationMocks.get,
    toString: navigationMocks.toString,
  }),
}));

vi.mock("@/hooks/usePlanetsQuery", () => ({
  usePlanetsQuery: vi.fn(),
}));

describe("PlanetsListPage", () => {
  beforeEach(() => {
    usePlanetStore.setState({
      searchTerm: "",
      sortOrder: "asc",
      currentPage: 1,
      favoriteSlugs: [],
    });
  });

  it("renders heading and fetched planets", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [buildPlanet()],
      isPending: false,
      isError: false,
      error: null,
    } as never);

    render(<PlanetsListPage />);

    expect(screen.getByRole("heading", { name: "Solar Planet List", level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Search planets")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Earth", level: 3 })).toBeInTheDocument();
  });

  it("renders loading state", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [],
      isPending: true,
      isError: false,
      error: null,
    } as never);

    render(<PlanetsListPage />);

    expect(screen.getByText("Loading planets from API...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(usePlanetsQuery).mockReturnValue({
      data: [],
      isPending: false,
      isError: true,
      error: new Error("API unavailable"),
    } as never);

    render(<PlanetsListPage />);

    expect(screen.getByText(/Could not load planet data/i)).toBeInTheDocument();
  });
});
