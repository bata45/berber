import type { Appointment } from "@/lib/types";

/**
 * Demo randevu verisi — panel prototipini "dolu" ve gerçekçi göstermek için.
 * Tarihler bugüne göreli üretilir ki demo her gün taze görünsün.
 *
 * FAZ 2: Bu seed kaldırılır; randevular Supabase `appointments` tablosundan
 * (RLS ile yalnız sahibi berber) çekilir. serviceName burada bilerek
 * denormalize tutulur — hizmet sonradan silinse/düzenlense bile liste bozulmaz.
 */

/** Bugüne göreli ISO tarih ("2026-06-30"). offset: gün farkı (+ gelecek, − geçmiş). */
const dayISO = (offset: number): string =>
  new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);

/** Bugüne göreli ISO zaman damgası — createdAt için. */
const stampISO = (offsetDays: number): string =>
  new Date(Date.now() + offsetDays * 86_400_000).toISOString();

export const ornekRandevular: Appointment[] = [
  // — Bugün —
  {
    id: "apt-001",
    customerName: "Emre Koç",
    customerPhone: "0532 415 88 21",
    serviceId: "sac-sakal",
    serviceName: "Saç + Sakal",
    date: dayISO(0),
    time: "11:00",
    status: "confirmed",
    source: "whatsapp",
    note: "Yanları kısa, üst uzun kalsın.",
    createdAt: stampISO(-1),
  },
  {
    id: "apt-002",
    customerName: "Burak Şahin",
    customerPhone: "0541 207 63 09",
    serviceId: "sac",
    serviceName: "Saç Kesimi",
    date: dayISO(0),
    time: "14:30",
    status: "confirmed",
    source: "form",
    createdAt: stampISO(-2),
  },
  {
    id: "apt-003",
    customerName: "Onur Demir",
    customerPhone: "0505 818 42 76",
    serviceId: "ustura",
    serviceName: "Sıcak Havlu Ustura Tıraşı",
    date: dayISO(0),
    time: "17:00",
    status: "pending",
    source: "whatsapp",
    createdAt: stampISO(0),
  },

  // — Bekleyen istekler (gelecek) —
  {
    id: "apt-004",
    customerName: "Mert Yılmaz",
    customerPhone: "0536 902 17 54",
    serviceId: "sac-sakal",
    serviceName: "Saç + Sakal",
    date: dayISO(1),
    time: "10:30",
    status: "pending",
    source: "form",
    note: "Düğün öncesi, acelem var.",
    createdAt: stampISO(0),
  },
  {
    id: "apt-005",
    customerName: "Kaan Aksoy",
    customerPhone: "0553 644 30 18",
    serviceId: "sakal",
    serviceName: "Sakal Tıraşı (Ustura)",
    date: dayISO(2),
    time: "16:00",
    status: "pending",
    source: "whatsapp",
    createdAt: stampISO(0),
  },
  {
    id: "apt-006",
    customerName: "Hakan Çelik",
    customerPhone: "0544 110 92 35",
    serviceId: "cocuk",
    serviceName: "Çocuk Saç Kesimi",
    date: dayISO(3),
    time: "12:00",
    status: "pending",
    source: "form",
    note: "Oğlum 6 yaşında, ilk tıraşı.",
    createdAt: stampISO(-1),
  },

  // — Onaylı (gelecek) —
  {
    id: "apt-007",
    customerName: "Serkan Arslan",
    customerPhone: "0530 471 26 88",
    serviceId: "sac",
    serviceName: "Saç Kesimi",
    date: dayISO(1),
    time: "13:00",
    status: "confirmed",
    source: "whatsapp",
    createdAt: stampISO(-1),
  },
  {
    id: "apt-008",
    customerName: "Tolga Yıldız",
    customerPhone: "0538 325 70 41",
    serviceId: "cilt",
    serviceName: "Cilt Bakımı & Maske",
    date: dayISO(4),
    time: "15:30",
    status: "confirmed",
    source: "form",
    createdAt: stampISO(-3),
  },

  // — Geçmiş: tamamlanan —
  {
    id: "apt-009",
    customerName: "Cem Öztürk",
    customerPhone: "0555 198 60 23",
    serviceId: "sac-sakal",
    serviceName: "Saç + Sakal",
    date: dayISO(-2),
    time: "18:30",
    status: "done",
    source: "whatsapp",
    createdAt: stampISO(-3),
  },
  {
    id: "apt-010",
    customerName: "Volkan Aydın",
    customerPhone: "0542 736 51 09",
    serviceId: "ustura",
    serviceName: "Sıcak Havlu Ustura Tıraşı",
    date: dayISO(-4),
    time: "11:30",
    status: "done",
    source: "form",
    createdAt: stampISO(-5),
  },
  {
    id: "apt-011",
    customerName: "Deniz Kaya",
    customerPhone: "0531 504 88 17",
    serviceId: "sac",
    serviceName: "Saç Kesimi",
    date: dayISO(-6),
    time: "16:30",
    status: "done",
    source: "whatsapp",
    createdAt: stampISO(-7),
  },

  // — Geçmiş: iptal —
  {
    id: "apt-012",
    customerName: "Uğur Polat",
    customerPhone: "0546 283 19 40",
    serviceId: "sakal",
    serviceName: "Sakal Tıraşı (Ustura)",
    date: dayISO(-1),
    time: "19:00",
    status: "cancelled",
    source: "form",
    note: "Müşteri gelemeyeceğini bildirdi.",
    createdAt: stampISO(-2),
  },
];
