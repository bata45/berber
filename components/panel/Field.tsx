"use client";

import { cn } from "@/lib/utils";

const FIELD_INPUT =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 font-sans text-sm text-ink placeholder:text-muted2 focus:border-brass focus:outline-none";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  prefix?: string;
  inputMode?: "text" | "numeric" | "tel" | "decimal";
  className?: string;
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  multiline = false,
  rows = 4,
  prefix,
  inputMode,
  className,
}: FieldProps) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block font-sans text-sm font-medium text-muted">
        {label}
      </span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={cn(FIELD_INPUT, "resize-y leading-relaxed")}
        />
      ) : prefix ? (
        <span className="flex items-center rounded-lg border border-line bg-surface focus-within:border-brass">
          <span className="select-none pl-4 pr-1 font-sans text-sm text-muted2">
            {prefix}
          </span>
          <input
            type={type}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent py-2.5 pr-4 font-sans text-sm text-ink placeholder:text-muted2 focus:outline-none"
          />
        </span>
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={FIELD_INPUT}
        />
      )}

      {hint && (
        <span className="mt-1 block font-sans text-xs text-muted2">{hint}</span>
      )}
    </label>
  );
}
