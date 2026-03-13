import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PlanetStatItem } from "./PlanetStatItem";

describe("PlanetStatItem", () => {
  it("renders label and value", () => {
    render(
      <dl>
        <PlanetStatItem stat={{ label: "Gravity", value: "9.8 m/s2" }} />
      </dl>,
    );

    expect(screen.getByText("Gravity")).toBeInTheDocument();
    expect(screen.getByText("9.8 m/s2")).toBeInTheDocument();
  });
});
