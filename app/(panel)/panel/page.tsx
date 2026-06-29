"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  Scissors,
  Inbox,
  CalendarCheck,
} from "lucide-react";
import { usePanelStore } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { StatCard } from "@/components/panel/StatCard";
import { AppointmentRow } from "@/components/panel/AppointmentRow";
import { EmptyState } from "@/components/panel/EmptyState";
import { StatGridSkeleton, ListSkeleton } from "@/components/panel/Skeleton";

const todayISO = () => new Date().toISOString().slice(0, 10);
const addDaysISO = (days: number) =>
  new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

export default function DashboardPage() {
  const { data, ready } = usePanelStore();
  const { barber, appointments } = data;

  const stats = useMemo(() => {
    const today = todayISO();
    const weekEnd = addDaysISO(7);
    return {
      todayCount: appointments.filter(
        (a) => a.date === today && a.status !== "cancelled",
      ).length,
      pendingCount: appointments.filter((a) => a.status === "pending").length,
      weekConfirmed: appointments.filter(
        (a) =>
          a.status === "confirmed" && a.date >= today && a.date <= weekEnd,
      ).length,
      services: barber.services.length,
    };
  }, [appointments, barber.services.length]);

  const pendingList = useMemo(
    () =>
      appointments
        .filter((a) => a.status === "pending")
        .sort((x, y) =>
          `${x.date} ${x.time}`.localeCompare(`${y.date} ${y.time}`),
        )
        .slice(0, 4),
    [appointments],
  );

  const todayList = useMemo(() => {
    const today = todayISO();
    return appointments
      .filter((a) => a.date === today && a.status !== "cancelled")
      .sort((x, y) => x.time.localeCompare(y.time));
  }, [appointments]);

  return (
    <div>
      <PageHeader
        eyebrow="Yönetim"
        title="Genel Bakış"
        subtitle={`${barber.shopName} — bugünün özeti`}
      />

      {!ready ? (
        <StatGridSkeleton />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Bugünkü Randevu"
            value={stats.todayCount}
            icon={CalendarDays}
            accent
          />
          <StatCard
            label="Bekleyen İstek"
            value={stats.pendingCount}
            icon={Clock3}
            accent={stats.pendingCount > 0}
          />
          <StatCard
            label="Bu Hafta Onaylı"
            value={stats.weekConfirmed}
            icon={CheckCircle2}
          />
          <StatCard
            label="Toplam Hizmet"
            value={stats.services}
            icon={Scissors}
          />
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Bekleyen istekler */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Bekleyen İstekler</h2>
            <Link
              href="/panel/randevular"
              className="font-sans text-sm text-muted transition hover:text-brass-light"
            >
              Tümü →
            </Link>
          </div>
          {!ready ? (
            <ListSkeleton rows={2} />
          ) : pendingList.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="Bekleyen istek yok"
              description="Yeni randevu talepleri burada görünür."
            />
          ) : (
            <div className="space-y-3">
              {pendingList.map((a) => (
                <AppointmentRow key={a.id} appointment={a} />
              ))}
            </div>
          )}
        </section>

        {/* Bugünün programı */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Bugünün Programı</h2>
          </div>
          {!ready ? (
            <ListSkeleton rows={2} />
          ) : todayList.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="Bugün randevu yok"
              description="Bugün için onaylı veya bekleyen randevu bulunmuyor."
            />
          ) : (
            <div className="space-y-3">
              {todayList.map((a) => (
                <AppointmentRow key={a.id} appointment={a} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
