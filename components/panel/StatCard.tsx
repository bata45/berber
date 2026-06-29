import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: boolean;
}

export function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
          accent
            ? "border-brass/40 bg-brass/10 text-brass-light"
            : "border-line bg-surface2/60 text-muted",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-3xl leading-none text-ink">{value}</p>
        <p className="mt-1.5 truncate font-sans text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
