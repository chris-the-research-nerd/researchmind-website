import { BarChart3, Cpu, Search } from "lucide-react";
import type { Practice } from "@/content/home";

export function PracticeIcon({ name, size = 24 }: { name: Practice["icon"]; size?: number }) {
  const props = { size, strokeWidth: 1.5 };
  if (name === "Cpu") return <Cpu {...props} />;
  if (name === "Search") return <Search {...props} />;
  return <BarChart3 {...props} />;
}
