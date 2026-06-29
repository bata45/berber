import type { Barber } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Star, MapPin, ArrowRight, Scissors } from "lucide-react";

export function Hero({ barber }: { barber: Barber }) {
  const wa = buildWhatsAppUrl(
    barber.whatsapp,
    `Merhaba ${barber.shopName}, randevu almak istiyorum.`,
  );

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell grid items-center gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-24">
        {/* Left — type-led, asymmetric, left-aligned */}
        <div className="lg:col-span-7">
          <p className="eyebrow">
            <span className="h-px w-8 bg-brass" />
            {barber.district} · {barber.city} · est. {barber.sinceYear}
          </p>

          <h1 className="mt-6 font-display font-medium leading-[0.92] text-ink display-xl text-balance">
            {barber.shopName}
            <span className="block italic text-brass">Tıraş Evi</span>
          </h1>

          <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-muted text-balance">
            {barber.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 text-sm text-ink">
              <Star className="h-4 w-4 fill-brass text-brass" />
              <strong className="font-semibold">{barber.rating.toFixed(1)}</strong>
              <span className="text-muted2">({barber.reviewCount} değerlendirme)</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-brass" />
              {barber.address}, {barber.district}
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#randevu" className="btn-brass">
              Randevu Al
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-4 w-4 text-brass-light" />
              WhatsApp’tan yaz
            </a>
          </div>
        </div>

        {/* Right — art-directed image block with the signature brass pole */}
        <div className="lg:col-span-5">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-sm lg:max-w-none">
            {/* The barber-pole motif: the page's recurring signature accent */}
            <div className="pole animate-pole absolute -left-3 top-6 bottom-6 z-20 w-2 rounded-full shadow-brass" />

            <div className="grain relative h-full w-full overflow-hidden rounded-[18px] border border-line">
              {/* Duotone placeholder — swap for the shop's real photo later */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 80% at 30% 0%, rgba(201,162,75,0.22), transparent 55%), linear-gradient(160deg, #1c1822 0%, #0e0c12 60%, #0a090c 100%)",
                }}
              />
              <Scissors
                className="absolute -right-6 bottom-4 h-48 w-48 -rotate-12 text-brass/10"
                strokeWidth={1}
              />
              <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between">
                <div>
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-eyebrow text-brass-light">
                    Usta
                  </p>
                  <p className="mt-1 font-display text-2xl text-ink">{barber.master}</p>
                </div>
                <span className="rounded-full border border-brass/30 bg-bg/50 px-3 py-1 font-sans text-xs font-medium text-brass-light backdrop-blur">
                  {barber.sinceYear}’dan beri
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="hr-brass" />
      </div>
    </section>
  );
}
