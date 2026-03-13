type PillProps = {
  children: React.ReactNode;
  variant?: "default" | "favorite";
  icon?: React.ReactNode;
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<PillProps["variant"]>, string> = {
  default: "border-cyan-700/40 bg-cyan-100/70 text-cyan-900",
  favorite: "border-amber-300/80 bg-amber-100/90 text-amber-900 shadow-sm",
};

export function Pill({ children, variant = "default", icon, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </span>
  );
}
