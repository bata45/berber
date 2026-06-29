"use client";

import { cn } from "@/lib/utils";

interface ToggleOption<T> {
  value: T;
  label: string;
}

interface ToggleGroupProps<T extends string | number> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
}

export function ToggleGroup<T extends string | number>({
  options,
  value,
  onChange,
  size = "md",
  className,
}: ToggleGroupProps<T>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-full border font-sans font-medium transition",
              size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
              selected
                ? "border-brass bg-brass text-[#1a1206]"
                : "border-line text-muted hover:border-brass/40 hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
