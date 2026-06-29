import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  description,
  children,
  footer,
  className,
}: SectionCardProps) {
  return (
    <section className={cn("card p-6 sm:p-7", className)}>
      {(title || description) && (
        <div className="mb-5">
          {title && <h2 className="font-display text-lg text-ink">{title}</h2>}
          {description && (
            <p className="mt-1 font-sans text-sm text-muted">{description}</p>
          )}
        </div>
      )}

      {children}

      {footer && (
        <>
          <div className="hr-brass my-5" />
          <div className="flex flex-wrap items-center justify-end gap-3">
            {footer}
          </div>
        </>
      )}
    </section>
  );
}
