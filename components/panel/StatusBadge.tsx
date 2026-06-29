import type { AppointmentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Bekliyor",
    className: "border-brass/40 bg-brass/10 text-brass-light",
  },
  confirmed: {
    label: "Onaylandı",
    className: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300/90",
  },
  done: {
    label: "Tamamlandı",
    className: "border-line bg-surface2/60 text-muted",
  },
  cancelled: {
    label: "İptal",
    className: "border-red-400/30 bg-red-400/10 text-red-300/90",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: AppointmentStatus;
  className?: string;
}) {
  const cfg = STATUS_MAP[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[0.7rem] font-semibold",
        cfg.className,
        className,
      )}
    >
      {cfg.label}
    </span>
  );
}
