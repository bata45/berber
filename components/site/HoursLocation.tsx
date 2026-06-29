import type { Barber } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { MapPin, Phone, Instagram, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function HoursLocation({ barber }: { barber: Barber }) {
  const todayName = new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    timeZone: "Europe/Istanbul",
  }).format(new Date());

  const wa = buildWhatsAppUrl(
    barber.whatsapp,
    `Merhaba ${barber.shopName}, randevu almak istiyorum.`,
  );

  return (
    <section id="iletisim" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <p className="eyebrow">
          <span className="h-px w-8 bg-brass" />
          Bize Ulaşın
        </p>
        <h2 className="mt-5 font-display font-medium text-ink display-lg">
          Saatler & Konum
        </h2>

        <div className="mt-9 grid gap-6 lg:grid-cols-12">
          {/* Hours + contact */}
          <div className="lg:col-span-5">
            <div className="card p-6">
              <div className="flex items-center gap-2 text-brass-light">
                <Clock className="h-4 w-4" />
                <span className="font-sans text-sm font-semibold uppercase tracking-wider">
                  Çalışma Saatleri
                </span>
              </div>
              <ul className="mt-4 divide-y divide-line/70">
                {barber.hours.map((h) => {
                  const isToday = h.day === todayName;
                  return (
                    <li
                      key={h.day}
                      className={cn(
                        "flex items-center justify-between py-2.5 font-sans text-sm",
                        isToday ? "text-ink" : "text-muted",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && <span className="h-1.5 w-1.5 rounded-full bg-brass" />}
                        <span className={cn(isToday && "font-semibold")}>{h.day}</span>
                      </span>
                      <span className={cn("tabular-nums", h.closed && "text-muted2")}>
                        {h.closed ? "Kapalı" : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="card mt-4 divide-y divide-line/70 p-2">
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                label={`${barber.address}, ${barber.district} / ${barber.city}`}
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label={barber.phoneDisplay}
                href={`tel:${barber.phoneDisplay.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon={<WhatsAppIcon className="h-4 w-4" />}
                label="WhatsApp ile yaz"
                href={wa}
                external
              />
              <ContactRow
                icon={<Instagram className="h-4 w-4" />}
                label={`@${barber.instagram}`}
                href={`https://instagram.com/${barber.instagram}`}
                external
              />
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-7">
            <div className="grain h-full min-h-[320px] overflow-hidden rounded-[14px] border border-line">
              <iframe
                title={`${barber.shopName} konum`}
                src={barber.mapEmbedUrl}
                className="h-full min-h-[320px] w-full grayscale-[0.3] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <span className="flex items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm text-muted transition group-hover:bg-white/[0.02] group-hover:text-ink">
      <span className="text-brass">{icon}</span>
      {label}
    </span>
  );
  if (!href) return <div className="group">{inner}</div>;
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block"
    >
      {inner}
    </a>
  );
}
