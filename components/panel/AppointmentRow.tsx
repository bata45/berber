"use client";

import type { ReactNode } from "react";
import {
  Check,
  X,
  CheckCheck,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import type { Appointment } from "@/lib/types";
import { usePanelStore } from "@/lib/store/panel-store";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  weekday: "long",
});

/** ISO tarihi ("2026-06-30") yerel tarihe çevirir — UTC kayması olmadan. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return dateFmt.format(new Date(y, m - 1, d));
}

type ActionVariant = "confirm" | "reject" | "muted";

function ActionBtn({
  onClick,
  variant,
  icon: Icon,
  children,
}: {
  onClick: () => void;
  variant: ActionVariant;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-sans text-xs font-semibold transition",
        variant === "confirm" &&
          "border-emerald-400/40 text-emerald-300/90 hover:bg-emerald-400/10",
        variant === "reject" &&
          "border-red-400/40 text-red-300/90 hover:bg-red-400/10",
        variant === "muted" &&
          "border-line text-muted hover:border-brass/40 hover:text-ink",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

export function AppointmentRow({ appointment: a }: { appointment: Appointment }) {
  const { setAppointmentStatus } = usePanelStore();

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-base text-ink">{a.customerName}</h3>
            {a.source === "whatsapp" && (
              <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-400/70" />
            )}
          </div>
          <p className="mt-0.5 font-sans text-sm text-muted">{a.serviceName}</p>
        </div>
        <StatusBadge status={a.status} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-sans text-sm text-muted">
        <span className="text-ink">{formatDate(a.date)}</span>
        <span className="tabular-nums text-brass-light">{a.time}</span>
        <a
          href={`tel:${a.customerPhone.replace(/\s/g, "")}`}
          className="tabular-nums transition hover:text-ink"
        >
          {a.customerPhone}
        </a>
      </div>

      {a.note && (
        <p className="mt-3 rounded-lg border border-line bg-bg/40 px-3 py-2 font-sans text-sm italic text-muted">
          “{a.note}”
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {a.status === "pending" && (
          <>
            <ActionBtn
              onClick={() => setAppointmentStatus(a.id, "confirmed")}
              variant="confirm"
              icon={Check}
            >
              Onayla
            </ActionBtn>
            <ActionBtn
              onClick={() => setAppointmentStatus(a.id, "cancelled")}
              variant="reject"
              icon={X}
            >
              Reddet
            </ActionBtn>
          </>
        )}
        {a.status === "confirmed" && (
          <>
            <ActionBtn
              onClick={() => setAppointmentStatus(a.id, "done")}
              variant="confirm"
              icon={CheckCheck}
            >
              Tamamlandı
            </ActionBtn>
            <ActionBtn
              onClick={() => setAppointmentStatus(a.id, "cancelled")}
              variant="reject"
              icon={X}
            >
              İptal
            </ActionBtn>
          </>
        )}
        {(a.status === "done" || a.status === "cancelled") && (
          <ActionBtn
            onClick={() => setAppointmentStatus(a.id, "pending")}
            variant="muted"
            icon={RotateCcw}
          >
            Geri al
          </ActionBtn>
        )}
      </div>
    </div>
  );
}
