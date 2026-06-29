"use client";

import { useEffect, useMemo, useState } from "react";
import type { Barber, WorkingDay } from "@/lib/types";
import { buildWhatsAppUrl, buildBookingMessage } from "@/lib/whatsapp";
import { formatTL, cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Check, ChevronRight, Loader2 } from "lucide-react";

const WEEKDAY_TR = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

interface DayOption {
  date: Date;
  iso: string;
  shortLabel: string; // "Cmt"
  dayNum: string; // "5"
  longLabel: string; // "5 Temmuz Cumartesi"
  hours: WorkingDay | undefined;
  closed: boolean;
}

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function fromMinutes(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function BookingWidget({ barber }: { barber: Barber }) {
  const [mounted, setMounted] = useState(false);
  const [serviceId, setServiceId] = useState(
    barber.services.find((s) => s.popular)?.id ?? barber.services[0]?.id,
  );
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", note: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const days = useMemo<DayOption[]>(() => {
    if (!mounted) return [];
    const today = new Date();
    const wdShort = new Intl.DateTimeFormat("tr-TR", { weekday: "short" });
    const dm = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long" });
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const name = WEEKDAY_TR[date.getDay()];
      const hours = barber.hours.find((h) => h.day === name);
      const closed = !hours || !!hours.closed;
      return {
        date,
        iso: date.toISOString().slice(0, 10),
        shortLabel: i === 0 ? "Bugün" : wdShort.format(date).replace(".", ""),
        dayNum: String(date.getDate()),
        longLabel: `${dm.format(date)} ${name}`,
        hours,
        closed,
      };
    });
  }, [mounted, barber.hours]);

  const selectedDay = days.find((d) => d.iso === dayIso) ?? null;
  const selectedService = barber.services.find((s) => s.id === serviceId);

  const slots = useMemo<string[]>(() => {
    if (!selectedDay || selectedDay.closed || !selectedDay.hours) return [];
    const open = toMinutes(selectedDay.hours.open);
    const close = toMinutes(selectedDay.hours.close);
    const step = barber.slotMinutes;
    const now = new Date();
    const isToday = selectedDay.iso === new Date().toISOString().slice(0, 10);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const out: string[] = [];
    for (let t = open; t <= close - step; t += step) {
      if (isToday && t <= nowMin + 30) continue; // 30 dk öncesinden randevu yok
      out.push(fromMinutes(t));
    }
    return out;
  }, [selectedDay, barber.slotMinutes]);

  // Pick the first open day automatically once mounted
  useEffect(() => {
    if (mounted && !dayIso) {
      const firstOpen = days.find((d) => !d.closed);
      if (firstOpen) setDayIso(firstOpen.iso);
    }
  }, [mounted, days, dayIso]);

  const ready = Boolean(selectedDay && !selectedDay.closed && time && selectedService);

  const waUrl = ready
    ? buildWhatsAppUrl(
        barber.whatsapp,
        buildBookingMessage({
          shopName: barber.shopName,
          dateLabel: selectedDay!.longLabel,
          timeLabel: time!,
          serviceName: selectedService!.name,
        }),
      )
    : "#";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.company) return; // honeypot — bot doldurursa sessizce yut
    if (form.name.trim().length < 2) {
      setError("Lütfen adınızı yazın.");
      return;
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!/^(0?5\d{9})$/.test(phoneDigits)) {
      setError("Geçerli bir cep telefonu girin (05XX XXX XX XX).");
      return;
    }
    setStatus("sending");
    // Demo: Faz 3'te bu istek /api/appointments'a POST edilecek (pending kaydı).
    setTimeout(() => setStatus("done"), 650);
  }

  return (
    <section id="randevu" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <div className="grain card relative overflow-hidden p-6 sm:p-10">
          <div className="relative z-10 grid gap-10 lg:grid-cols-12">
            {/* Picker */}
            <div className="lg:col-span-7">
              <p className="eyebrow">
                <span className="h-px w-8 bg-brass" />
                Online Randevu
              </p>
              <h2 className="mt-5 font-display font-medium text-ink display-md">
                Gününü ve saatini seç
              </h2>

              {/* Services */}
              <div className="mt-7">
                <p className="mb-3 font-sans text-sm font-medium text-muted">Hizmet</p>
                <div className="flex flex-wrap gap-2">
                  {barber.services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 font-sans text-sm font-medium transition",
                        s.id === serviceId
                          ? "border-brass bg-brass/15 text-brass-light"
                          : "border-line text-muted hover:border-brass/40 hover:text-ink",
                      )}
                    >
                      {s.name}
                      <span className="ml-2 text-xs text-muted2">{formatTL(s.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Days */}
              <div className="mt-7">
                <p className="mb-3 font-sans text-sm font-medium text-muted">Gün</p>
                {!mounted ? (
                  <div className="h-[68px] animate-pulse rounded-xl bg-surface2/60" />
                ) : (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {days.map((d) => (
                      <button
                        key={d.iso}
                        type="button"
                        disabled={d.closed}
                        onClick={() => {
                          setDayIso(d.iso);
                          setTime(null);
                        }}
                        className={cn(
                          "flex min-w-[64px] flex-col items-center rounded-xl border px-3 py-2.5 font-sans transition",
                          d.closed && "cursor-not-allowed border-line/50 opacity-35",
                          !d.closed && d.iso === dayIso
                            ? "border-brass bg-brass/15 text-brass-light"
                            : !d.closed && "border-line text-muted hover:border-brass/40 hover:text-ink",
                        )}
                      >
                        <span className="text-[0.62rem] font-semibold uppercase tracking-wider">
                          {d.shortLabel}
                        </span>
                        <span className="mt-0.5 font-display text-lg">{d.dayNum}</span>
                        {d.closed && <span className="text-[0.55rem] text-muted2">kapalı</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Times */}
              <div className="mt-7">
                <p className="mb-3 font-sans text-sm font-medium text-muted">Saat</p>
                {!mounted ? (
                  <div className="h-10 animate-pulse rounded-lg bg-surface2/60" />
                ) : selectedDay?.closed ? (
                  <p className="font-sans text-sm text-muted2">Bu gün kapalıyız, başka bir gün seçin.</p>
                ) : slots.length === 0 ? (
                  <p className="font-sans text-sm text-muted2">Bugün için uygun saat kalmadı, yarını deneyin.</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {slots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={cn(
                          "rounded-lg border py-2 font-sans text-sm font-medium tabular-nums transition",
                          t === time
                            ? "border-brass bg-brass text-[#1a1206]"
                            : "border-line text-muted hover:border-brass/40 hover:text-ink",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary + actions */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-bg/50 p-6">
                <p className="font-sans text-sm font-medium text-muted">Özet</p>
                <dl className="mt-4 space-y-3 font-sans text-sm">
                  <Row label="Hizmet" value={selectedService?.name ?? "—"} />
                  <Row
                    label="Tarih"
                    value={selectedDay && !selectedDay.closed ? selectedDay.longLabel : "—"}
                  />
                  <Row label="Saat" value={time ?? "—"} />
                  <div className="hr-brass my-1" />
                  <div className="flex items-baseline justify-between">
                    <dt className="text-muted">Ücret</dt>
                    <dd className="font-display text-2xl text-brass-light">
                      {selectedService ? formatTL(selectedService.price) : "—"}
                    </dd>
                  </div>
                </dl>

                {status === "done" ? (
                  <div className="mt-6 rounded-xl border border-brass/30 bg-brass/10 p-4 text-center">
                    <Check className="mx-auto h-6 w-6 text-brass-light" />
                    <p className="mt-2 font-sans text-sm font-medium text-ink">
                      Talebiniz alındı{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                    </p>
                    <p className="mt-1 font-sans text-xs text-muted">
                      {barber.master} en kısa sürede WhatsApp’tan dönüş yapacak.
                    </p>
                  </div>
                ) : (
                  <>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!ready}
                      onClick={(e) => !ready && e.preventDefault()}
                      className={cn(
                        "btn-brass mt-6 w-full",
                        !ready && "pointer-events-none opacity-40",
                      )}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp’tan Randevu Al
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowForm((v) => !v)}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 font-sans text-sm text-muted transition hover:text-brass-light"
                    >
                      veya bilgini bırak, biz arayalım
                      <ChevronRight
                        className={cn("h-4 w-4 transition", showForm && "rotate-90")}
                      />
                    </button>

                    {showForm && (
                      <form onSubmit={handleSubmit} className="mt-4 space-y-3 animate-fade-up">
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Ad Soyad"
                          className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 font-sans text-sm text-ink placeholder:text-muted2 focus:border-brass focus:outline-none"
                        />
                        <input
                          type="tel"
                          inputMode="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="05XX XXX XX XX"
                          className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 font-sans text-sm text-ink placeholder:text-muted2 focus:border-brass focus:outline-none"
                        />
                        {/* honeypot — gizli, sadece botlar doldurur */}
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className="hidden"
                          aria-hidden="true"
                        />
                        {error && (
                          <p className="font-sans text-xs text-red-300/90">{error}</p>
                        )}
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="btn-ghost w-full"
                        >
                          {status === "sending" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Talep Gönder"
                          )}
                        </button>
                        <p className="text-center font-sans text-[0.7rem] leading-relaxed text-muted2">
                          Bilgilerin sadece randevu için kullanılır.
                        </p>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
