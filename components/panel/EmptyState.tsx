import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-12 text-center">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface2/60 text-muted2">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <p className="font-display text-lg text-ink">{title}</p>
      {description && (
        <p className="mt-1.5 max-w-xs font-sans text-sm text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
