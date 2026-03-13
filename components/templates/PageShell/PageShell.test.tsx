import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageShell } from "./PageShell";

describe("PageShell", () => {
  it("renders children inside main container", () => {
    render(
      <PageShell>
        <p>Content</p>
      </PageShell>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
