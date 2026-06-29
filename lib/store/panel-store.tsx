"use client";

/**
 * Panel veri deposu — prototip için tek kaynak (backend yok).
 *
 * Strateji (hydration-güvenli):
 *  1) State, seed'den SENKRON başlatılır → sunucu ve ilk istemci render'ı AYNI.
 *  2) Mount sonrası useEffect localStorage'ı okur; varsa state'i değiştirir, sonra `ready=true`.
 *  3) `ready` olduğunda her değişiklik localStorage'a yazılır.
 * Veri-bağımlı bölümler `ready` gelene kadar iskelet gösterir (BookingWidget `mounted` deseni).
 *
 * FAZ 2 DİKİŞİ: Eylem gövdeleri (updateProfile, addService, setAppointmentStatus ...)
 * Supabase çağrılarıyla değişir. `usePanelStore()` API'si ve dönen şekil sabit kalır;
 * sayfaların değişmesi gerekmez.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  Appointment,
  AppointmentStatus,
  Barber,
  GalleryItem,
  Service,
  WorkingDay,
} from "@/lib/types";
import { ornekBerber } from "@/lib/seed/ornek-berber";
import { ornekRandevular } from "@/lib/seed/ornek-randevular";

const STORAGE_KEY = "berber_panel_v1";

export interface PanelData {
  barber: Barber;
  appointments: Appointment[];
}

/** Profilde panelden düzenlenebilen alanlar (slug/rating gibi türetilenler hariç). */
export type ProfilePatch = Partial<
  Pick<
    Barber,
    | "shopName"
    | "master"
    | "tagline"
    | "about"
    | "address"
    | "district"
    | "city"
    | "phoneDisplay"
    | "whatsapp"
    | "instagram"
  >
>;

export type SettingsPatch = Partial<Pick<Barber, "bookingMode" | "slotMinutes">>;

interface PanelContextValue {
  data: PanelData;
  ready: boolean;
  // profil
  updateProfile: (patch: ProfilePatch) => void;
  // hizmetler
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, patch: Partial<Omit<Service, "id">>) => void;
  removeService: (id: string) => void;
  // galeri
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  removeGalleryItem: (id: string) => void;
  // saatler
  updateHours: (hours: WorkingDay[]) => void;
  // ayarlar
  updateSettings: (patch: SettingsPatch) => void;
  // randevular
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  // demo
  resetAll: () => void;
}

const PanelContext = createContext<PanelContextValue | null>(null);

/** Derin kopya — seed referanslarının mutasyona uğramaması için. */
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function seedData(): PanelData {
  return {
    barber: clone(ornekBerber),
    appointments: clone(ornekRandevular),
  };
}

function genId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rand}`;
}

export function PanelProvider({ children }: { children: ReactNode }) {
  // Senkron seed → SSR ile ilk istemci render'ı eşit (hydration mismatch yok).
  const [data, setData] = useState<PanelData>(seedData);
  const [ready, setReady] = useState(false);
  const persistRef = useRef(false);

  // Mount sonrası localStorage'ı oku.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PanelData>;
        if (parsed && parsed.barber && Array.isArray(parsed.appointments)) {
          setData({
            barber: parsed.barber,
            appointments: parsed.appointments,
          });
        }
      }
    } catch {
      // bozuk/eksik kayıt → seed ile devam
    }
    persistRef.current = true;
    setReady(true);
  }, []);

  // ready sonrası her değişikliği kalıcı yap.
  useEffect(() => {
    if (!persistRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // kota/erişim hatası → sessiz geç (prototip)
    }
  }, [data]);

  const updateProfile = useCallback((patch: ProfilePatch) => {
    setData((d) => ({ ...d, barber: { ...d.barber, ...patch } }));
  }, []);

  const addService = useCallback((service: Omit<Service, "id">) => {
    setData((d) => ({
      ...d,
      barber: {
        ...d.barber,
        services: [...d.barber.services, { ...service, id: genId("svc") }],
      },
    }));
  }, []);

  const updateService = useCallback(
    (id: string, patch: Partial<Omit<Service, "id">>) => {
      setData((d) => ({
        ...d,
        barber: {
          ...d.barber,
          services: d.barber.services.map((s) =>
            s.id === id ? { ...s, ...patch } : s,
          ),
        },
      }));
    },
    [],
  );

  const removeService = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      barber: {
        ...d.barber,
        services: d.barber.services.filter((s) => s.id !== id),
      },
    }));
  }, []);

  const addGalleryItem = useCallback((item: Omit<GalleryItem, "id">) => {
    setData((d) => ({
      ...d,
      barber: {
        ...d.barber,
        gallery: [...d.barber.gallery, { ...item, id: genId("g") }],
      },
    }));
  }, []);

  const removeGalleryItem = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      barber: {
        ...d.barber,
        gallery: d.barber.gallery.filter((g) => g.id !== id),
      },
    }));
  }, []);

  const updateHours = useCallback((hours: WorkingDay[]) => {
    setData((d) => ({ ...d, barber: { ...d.barber, hours } }));
  }, []);

  const updateSettings = useCallback((patch: SettingsPatch) => {
    setData((d) => ({ ...d, barber: { ...d.barber, ...patch } }));
  }, []);

  const setAppointmentStatus = useCallback(
    (id: string, status: AppointmentStatus) => {
      setData((d) => ({
        ...d,
        appointments: d.appointments.map((a) =>
          a.id === id ? { ...a, status } : a,
        ),
      }));
    },
    [],
  );

  const resetAll = useCallback(() => {
    setData(seedData());
  }, []);

  const value: PanelContextValue = {
    data,
    ready,
    updateProfile,
    addService,
    updateService,
    removeService,
    addGalleryItem,
    removeGalleryItem,
    updateHours,
    updateSettings,
    setAppointmentStatus,
    resetAll,
  };

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
}

export function usePanelStore(): PanelContextValue {
  const ctx = useContext(PanelContext);
  if (!ctx) {
    throw new Error("usePanelStore yalnızca <PanelProvider> içinde kullanılabilir.");
  }
  return ctx;
}
