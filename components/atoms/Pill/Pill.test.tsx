import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Pill } from "./Pill";

describe("Pill", () => {
  it("renders its content and optional icon", () => {
    render(
      <Pill icon={<span data-testid="pill-icon">*</span>} variant="favorite">
        Favorite
      </Pill>,
    );

    expect(screen.getByText("Favorite")).toBeInTheDocument();
    expect(screen.getByTestId("pill-icon")).toBeInTheDocument();
  });
});
