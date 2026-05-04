type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-14 md:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}
