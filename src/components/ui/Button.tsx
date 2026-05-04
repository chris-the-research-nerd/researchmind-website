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
    "inline-block text-sm font-medium tracking-wide transition-colors duration-200";
  const variants = {
    primary: "bg-foreground text-white px-8 py-3.5 hover:bg-[#333333]",
    secondary:
      "border border-foreground text-foreground px-8 py-3.5 hover:bg-foreground hover:text-white",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
