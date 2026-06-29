import type { Barber } from "@/lib/types";

export function About({ barber }: { barber: Barber }) {
  const years = new Date().getFullYear() - barber.sinceYear;

  const stats = [
    { value: `${years}`, label: "yıl tecrübe" },
    { value: barber.rating.toFixed(1), label: "müşteri puanı" },
    { value: `${barber.reviewCount}`, label: "değerlendirme" },
  ];

  return (
    <section id="hikaye" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">
              <span className="h-px w-8 bg-brass" />
              Hikâye
            </p>
            <h2 className="mt-5 max-w-xl font-display font-medium text-ink display-lg text-balance">
              {barber.master} ve {barber.shopName}
            </h2>
            <div className="mt-6 max-w-xl space-y-4 font-sans text-lg leading-relaxed text-muted">
              {barber.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Pole-flanked stat column — signature motif reused */}
          <div className="lg:col-span-5">
            <div className="relative flex gap-6 pl-6">
              <div className="pole absolute left-0 top-1 bottom-1 w-1.5 rounded-full" />
              <dl className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                {stats.map((s) => (
                  <div key={s.label} className="bg-surface px-6 py-7">
                    <dt className="font-display text-4xl text-brass-light">
                      {s.value}
                    </dt>
                    <dd className="mt-1 font-sans text-sm uppercase tracking-wider text-muted2">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
