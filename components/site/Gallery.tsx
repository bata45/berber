import type { Barber, GalleryItem } from "@/lib/types";

const TONES: Record<number, string> = {
  0: "radial-gradient(120% 90% at 20% 0%, rgba(201,162,75,0.20), transparent 55%), linear-gradient(155deg,#211a24,#0c0b10)",
  1: "radial-gradient(120% 90% at 80% 10%, rgba(201,162,75,0.14), transparent 55%), linear-gradient(155deg,#1a1922,#0b0a0f)",
  2: "radial-gradient(120% 90% at 30% 100%, rgba(140,106,47,0.22), transparent 55%), linear-gradient(135deg,#241c16,#0e0c0a)",
  3: "radial-gradient(120% 90% at 70% 0%, rgba(201,162,75,0.12), transparent 55%), linear-gradient(160deg,#181a20,#0b0c0e)",
};

// Deliberate, varied spans → broken-grid rhythm instead of uniform tiles
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

function Tile({ item, span }: { item: GalleryItem; span: string }) {
  return (
    <figure
      className={`group grain relative overflow-hidden rounded-xl border border-line ${span}`}
    >
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.alt}
          className="duotone absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 transition duration-700 group-hover:scale-105"
          style={{ backgroundImage: TONES[item.tone ?? 0] }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-3 bottom-3 z-10 translate-y-1 font-sans text-xs font-medium text-ink/90 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        {item.alt}
      </figcaption>
    </figure>
  );
}

export function Gallery({ barber }: { barber: Barber }) {
  return (
    <section id="galeri" className="scroll-mt-20 py-16 sm:py-24">
      <div className="shell">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">
              <span className="h-px w-8 bg-brass" />
              Dükkândan
            </p>
            <h2 className="mt-5 font-display font-medium text-ink display-lg">
              Galeri
            </h2>
          </div>
          <a
            href={`https://instagram.com/${barber.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hidden font-sans text-sm font-medium text-muted hover:text-brass-light sm:inline-block"
          >
            @{barber.instagram} →
          </a>
        </div>

        <div className="grid auto-rows-[130px] grid-cols-3 gap-3 sm:auto-rows-[180px] sm:grid-cols-4 sm:gap-4">
          {barber.gallery.map((item, i) => (
            <Tile key={item.id} item={item} span={SPANS[i % SPANS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
