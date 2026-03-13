import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionTitle } from "./SectionTitle";

describe("SectionTitle", () => {
  it("renders a heading", () => {
    render(<SectionTitle>Planet Facts</SectionTitle>);

    expect(
      screen.getByRole("heading", { name: "Planet Facts", level: 2 }),
    ).toBeInTheDocument();
  });
});
