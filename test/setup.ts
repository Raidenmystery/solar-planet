import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    const imgProps = { ...props };
    delete imgProps.priority;

    return React.createElement("img", { alt: props.alt ?? "", ...imgProps });
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});
