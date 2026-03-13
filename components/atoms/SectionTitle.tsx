type SectionTitleProps = {
  children: React.ReactNode;
};

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
      {children}
    </h2>
  );
}
