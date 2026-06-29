"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Scissors,
  Images,
  Store,
  Clock,
  Settings,
  ExternalLink,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV: NavItem[] = [
  { label: "Genel Bakış", href: "/panel", icon: LayoutDashboard },
  { label: "Randevular", href: "/panel/randevular", icon: CalendarDays },
  { label: "Hizmetler", href: "/panel/hizmetler", icon: Scissors },
  { label: "Galeri", href: "/panel/galeri", icon: Images },
  { label: "Profil", href: "/panel/profil", icon: Store },
  { label: "Çalışma Saatleri", href: "/panel/saatler", icon: Clock },
  { label: "Ayarlar", href: "/panel/ayarlar", icon: Settings },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobil arka plan örtüsü */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-surface/95 backdrop-blur-md transition-transform duration-300",
          "lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:bg-surface/40",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Marka */}
        <div className="flex items-center justify-between gap-3 px-5 py-5">
          <Link
            href="/panel"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <span className="pole h-9 w-2.5 rounded-full" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg text-ink">Berber Paneli</span>
              <span className="font-sans text-[0.65rem] uppercase tracking-eyebrow text-muted2">
                Yönetim
              </span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="rounded-lg border border-line p-1.5 text-muted transition hover:border-brass/40 hover:text-ink lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="hr-brass mx-5" />

        {/* Gezinme */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {NAV.map((item) => {
            const active =
              item.href === "/panel"
                ? pathname === "/panel"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium transition",
                  active
                    ? "bg-brass/15 text-brass-light"
                    : "text-muted hover:bg-surface2/60 hover:text-ink",
                )}
              >
                <Icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    active ? "text-brass-light" : "text-muted2",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hr-brass mx-5" />

        {/* Alt: siteyi görüntüle */}
        <div className="px-3 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium text-muted transition hover:bg-surface2/60 hover:text-ink"
          >
            <ExternalLink className="h-[18px] w-[18px] shrink-0 text-muted2" />
            Siteyi Görüntüle
          </a>
        </div>
      </aside>
    </>
  );
}
