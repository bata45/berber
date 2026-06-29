import Link from "next/link";
import type { Barber } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const NAV = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#galeri", label: "Galeri" },
  { href: "#hikaye", label: "Hikâye" },
  { href: "#iletisim", label: "İletişim" },
];

export function SiteHeader({ barber }: { barber: Barber }) {
  const wa = buildWhatsAppUrl(
    barber.whatsapp,
    `Merhaba ${barber.shopName}, randevu hakkında bilgi almak istiyorum.`,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            {barber.shopName}
          </span>
          <span className="hidden font-sans text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted2 sm:inline">
            est. {barber.sinceYear}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline font-sans text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile yaz"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-brass/50 hover:text-brass-light sm:hidden"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
          <a href="#randevu" className="btn-brass !px-5 !py-2.5">
            Randevu Al
          </a>
        </div>
      </div>
    </header>
  );
}
