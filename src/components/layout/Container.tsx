type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({
  children,
  className = "",
  narrow = false,
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-6 sm:px-8 ${
        narrow ? "max-w-[720px]" : "max-w-[1200px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
