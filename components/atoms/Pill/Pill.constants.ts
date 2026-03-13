import { TPill } from "./Pill.types";

export const VARIANT_CLASSES: Record<NonNullable<TPill["variant"]>, string> = {
  default: "border-cyan-700/40 bg-cyan-100/70 text-cyan-900",
  favorite: "border-amber-300/80 bg-amber-100/90 text-amber-900 shadow-sm",
};