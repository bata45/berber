"use client";

import { useState } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";
import type { BookingMode } from "@/lib/types";
import { usePanelStore } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { SectionCard } from "@/components/panel/SectionCard";
import { ToggleGroup } from "@/components/panel/ToggleGroup";
import { FormSkeleton } from "@/components/panel/Skeleton";

const MODE_OPTIONS: { value: BookingMode; label: string }[] = [
  { value: "whatsapp", label: "Sadece WhatsApp" },
  { value: "form", label: "Sadece Form" },
  { value: "both", label: "İkisi de" },
];

const SLOT_OPTIONS = [15, 20, 30, 45, 60].map((m) => ({
  value: m,
  label: `${m} dk`,
}));

export default function SettingsPage() {
  const { data, ready, updateSettings, resetAll } = usePanelStore();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!ready) {
    return (
      <div>
        <PageHeader
          eyebrow="Sistem"
          title="Ayarlar"
          subtitle="Randevu davranışını yapılandırın."
        />
        <FormSkeleton fields={3} />
      </div>
    );
  }

  const b = data.barber;

  return (
    <div>
      <PageHeader
        eyebrow="Sistem"
        title="Ayarlar"
        subtitle="Randevu davranışını yapılandırın."
      />

      <div className="space-y-6">
        <SectionCard
          title="Randevu Yöntemi"
          description="Müşteriler randevuyu nasıl talep etsin?"
        >
          <ToggleGroup
            options={MODE_OPTIONS}
            value={b.bookingMode}
            onChange={(v) => updateSettings({ bookingMode: v })}
          />
        </SectionCard>

        <SectionCard
          title="Randevu Aralığı"
          description="Takvimde saatler kaç dakikalık dilimlerle gösterilsin?"
        >
          <ToggleGroup
            options={SLOT_OPTIONS}
            value={b.slotMinutes}
            onChange={(v) => updateSettings({ slotMinutes: v })}
          />
        </SectionCard>

        <SectionCard
          title="Demo"
          description="Tüm düzenlemeleri silip örnek veriye geri dönün."
        >
          {confirmReset ? (
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-red-400/30 bg-red-400/5 p-4">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-300/90" />
              <p className="flex-1 font-sans text-sm text-muted">
                Tüm düzenlemeler silinip örnek veriye dönülecek. Emin misiniz?
              </p>
              <button
                onClick={() => {
                  resetAll();
                  setConfirmReset(false);
                }}
                className="rounded-full border border-red-400/40 px-4 py-2 font-sans text-sm font-semibold text-red-300/90 transition hover:bg-red-400/10"
              >
                Evet, sıfırla
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="rounded-full border border-line px-4 py-2 font-sans text-sm font-medium text-muted transition hover:text-ink"
              >
                Vazgeç
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="btn-ghost">
              <RotateCcw className="h-4 w-4" />
              Demoyu Sıfırla
            </button>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
