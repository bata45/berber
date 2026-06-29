import type { Barber } from "@/lib/types";

// Replace with your own platform/brand name — discreet credit doubles as marketing.
const PLATFORM_NAME = "Berber Sitem";

export function SiteFooter({ barber }: { barber: Barber }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg2/60">
      <div className="shell py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-2xl font-semibold text-ink">
              {barber.shopName}
            </p>
            <p className="mt-2 max-w-xs font-sans text-sm text-muted">
              {barber.tagline}
            </p>
            <p className="mt-4 font-sans text-sm text-muted2">
              {barber.address}, {barber.district} / {barber.city}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted">
            <a href="#hizmetler" className="hover:text-brass-light">Hizmetler</a>
            <a href="#galeri" className="hover:text-brass-light">Galeri</a>
            <a href="#randevu" className="hover:text-brass-light">Randevu</a>
            <a href="#iletisim" className="hover:text-brass-light">İletişim</a>
          </nav>
        </div>

        <div className="hr-brass my-8" />

        <div className="flex flex-col items-center justify-between gap-2 font-sans text-xs text-muted2 sm:flex-row">
          <p>© {year} {barber.shopName}. Tüm hakları saklıdır.</p>
          <p>
            Web sitesi & randevu sistemi:{" "}
            <span className="text-muted">{PLATFORM_NAME}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
