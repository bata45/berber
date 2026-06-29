"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { WorkingDay } from "@/lib/types";
import { usePanelStore } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { SectionCard } from "@/components/panel/SectionCard";
import { FormSkeleton } from "@/components/panel/Skeleton";
import { cn } from "@/lib/utils";

const TIME_INPUT =
  "rounded-lg border border-line bg-surface px-3 py-1.5 font-sans text-sm tabular-nums text-ink focus:border-brass focus:outline-none";

export default function HoursPage() {
  const { data, ready, updateHours } = usePanelStore();
  const [hours, setHours] = useState<WorkingDay[] | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!ready) return;
    setHours(data.barber.hours.map((h) => ({ ...h })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function patchDay(index: number, patch: Partial<WorkingDay>) {
    setHours((hs) =>
      hs ? hs.map((h, i) => (i === index ? { ...h, ...patch } : h)) : hs,
    );
    setSaved(false);
  }

  function handleSave() {
    if (!hours) return;
    // Kapalı günlerde saatleri temizle (veri tutarlılığı).
    const cleaned = hours.map((h) =>
      h.closed ? { ...h, open: "", close: "" } : h,
    );
    updateHours(cleaned);
    setSaved(true);
  }

  if (!ready || !hours) {
    return (
      <div>
        <PageHeader
          eyebrow="İçerik"
          title="Çalışma Saatleri"
          subtitle="Açık/kapalı günleri ve saatleri ayarlayın."
        />
        <FormSkeleton fields={7} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="İçerik"
        title="Çalışma Saatleri"
        subtitle="Açık/kapalı günleri ve saatleri ayarlayın."
      />

      <SectionCard
        footer={
          <button onClick={handleSave} className="btn-brass">
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Kaydedildi
              </>
            ) : (
              "Kaydet"
            )}
          </button>
        }
      >
        <div className="divide-y divide-line">
          {hours.map((h, i) => (
            <div
              key={h.day}
              className="flex flex-wrap items-center gap-4 py-3 first:pt-0 last:pb-0"
            >
              <span className="w-28 font-sans text-sm font-medium text-ink">
                {h.day}
              </span>

              <button
                onClick={() => patchDay(i, { closed: !h.closed })}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-sans text-xs font-medium transition",
                  h.closed
                    ? "border-line text-muted2 hover:border-brass/40 hover:text-ink"
                    : "border-brass bg-brass/15 text-brass-light",
                )}
              >
                {h.closed ? "Kapalı" : "Açık"}
              </button>

              {!h.closed && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={h.open}
                    onChange={(e) => patchDay(i, { open: e.target.value })}
                    className={TIME_INPUT}
                  />
                  <span className="text-muted2">—</span>
                  <input
                    type="time"
                    value={h.close}
                    onChange={(e) => patchDay(i, { close: e.target.value })}
                    className={TIME_INPUT}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
