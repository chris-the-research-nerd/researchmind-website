import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  children,
}: ButtonProps) {
  const base =
    "inline-block text-sm font-medium tracking-[0.02em] rounded transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";
  const variants = {
    primary:
      "bg-foreground text-white px-8 py-3.5 hover:bg-accent hover:-translate-y-px active:translate-y-0",
    secondary:
      "border border-foreground text-foreground px-8 py-3.5 hover:bg-foreground hover:text-white hover:-translate-y-px active:translate-y-0",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
