import type { Barber } from "@/lib/types";
import { formatTL } from "@/lib/utils";
import { Clock } from "lucide-react";

export function Services({ barber }: { barber: Barber }) {
  return (
    <section id="hizmetler" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">
              <span className="h-px w-8 bg-brass" />
              Fiyat Listesi
            </p>
            <h2 className="mt-5 font-display font-medium text-ink display-lg">
              Hizmetler
            </h2>
            <p className="mt-4 max-w-xs font-sans leading-relaxed text-muted">
              Tüm işlemler randevulu ve tek koltuğa özel. Fiyatlara yıkama dâhildir.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {barber.services.map((s) => (
                <li key={s.id}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="shrink-0 font-display text-xl font-medium text-ink">
                      {s.name}
                    </h3>
                    {s.popular && (
                      <span className="shrink-0 rounded-full border border-brass/40 px-2 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-brass-light">
                        Popüler
                      </span>
                    )}
                    <span className="h-px min-w-4 flex-1 translate-y-[-2px] self-end border-b border-dotted border-line" />
                    <span className="shrink-0 font-sans text-lg font-semibold text-brass-light">
                      {formatTL(s.price)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 font-sans text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5 text-muted2">
                      <Clock className="h-3.5 w-3.5" />
                      {s.durationMin} dk
                    </span>
                    {s.description && (
                      <span className="text-muted">· {s.description}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
