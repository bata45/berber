"use client";

import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import type { AppointmentStatus } from "@/lib/types";
import { usePanelStore } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { ToggleGroup } from "@/components/panel/ToggleGroup";
import { AppointmentRow } from "@/components/panel/AppointmentRow";
import { EmptyState } from "@/components/panel/EmptyState";
import { ListSkeleton } from "@/components/panel/Skeleton";

type Filter = "all" | AppointmentStatus;

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "pending", label: "Bekleyen" },
  { value: "confirmed", label: "Onaylı" },
  { value: "done", label: "Tamamlanan" },
  { value: "cancelled", label: "İptal" },
];

export default function AppointmentsPage() {
  const { data, ready } = usePanelStore();
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    const filtered =
      filter === "all"
        ? data.appointments
        : data.appointments.filter((a) => a.status === filter);
    // Yakın/gelecek tarih önce; aynı günde geç saat üstte.
    return [...filtered].sort((x, y) =>
      `${y.date} ${y.time}`.localeCompare(`${x.date} ${x.time}`),
    );
  }, [data.appointments, filter]);

  return (
    <div>
      <PageHeader
        eyebrow="Yönetim"
        title="Randevular"
        subtitle="Gelen talepleri onaylayın, durumları güncelleyin."
      />

      <ToggleGroup
        options={FILTER_OPTIONS}
        value={filter}
        onChange={setFilter}
        size="sm"
        className="mb-6"
      />

      {!ready ? (
        <ListSkeleton rows={4} />
      ) : list.length === 0 ? (
        <EmptyState
          icon={CalendarX}
          title="Kayıt yok"
          description="Bu filtreye uygun randevu bulunmuyor."
        />
      ) : (
        <div className="space-y-3">
          {list.map((a) => (
            <AppointmentRow key={a.id} appointment={a} />
          ))}
        </div>
      )}
    </div>
  );
}
