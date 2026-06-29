import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="eyebrow">
            <span className="h-px w-6 bg-brass" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display font-medium text-ink display-md">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 font-sans text-sm text-muted">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
