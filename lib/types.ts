export type BookingMode = "whatsapp" | "form" | "both";

export interface Service {
  id: string;
  name: string;
  price: number; // TL
  durationMin: number;
  description?: string;
  popular?: boolean;
}

export interface WorkingDay {
  day: string; // "Pazartesi"
  open: string; // "09:30"
  close: string; // "20:30"
  closed?: boolean;
}

export interface GalleryItem {
  id: string;
  alt: string;
  /** Optional real photo URL. If absent, an art-directed placeholder is shown. */
  src?: string;
  /** Visual tone for the placeholder gradient (0–3). */
  tone?: 0 | 1 | 2 | 3;
}

export interface Barber {
  slug: string;
  shopName: string;
  master: string;
  tagline: string;
  about: string[];
  sinceYear: number;
  rating: number;
  reviewCount: number;
  address: string;
  district: string;
  city: string;
  mapEmbedUrl: string;
  phoneDisplay: string; // "0555 012 34 56"
  whatsapp: string; // international, digits only: "905550123456"
  instagram: string; // handle without @
  services: Service[];
  hours: WorkingDay[];
  gallery: GalleryItem[];
  bookingMode: BookingMode;
  slotMinutes: number;
}

export type AppointmentStatus = "pending" | "confirmed" | "done" | "cancelled";
export type AppointmentSource = "whatsapp" | "form";

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string; // display form: "0555 012 34 56"
  serviceId?: string; // FK into Barber.services (may be missing if service later deleted)
  serviceName: string; // denormalized snapshot — list survives service edits/deletion
  date: string; // ISO date "2026-06-30"
  time: string; // "14:00"
  status: AppointmentStatus;
  note?: string;
  source: AppointmentSource;
  createdAt: string; // ISO timestamp
}
