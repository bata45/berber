"use client";

import { useState } from "react";
import { Plus, Trash2, ImagePlus } from "lucide-react";
import { usePanelStore } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { SectionCard } from "@/components/panel/SectionCard";
import { GridSkeleton } from "@/components/panel/Skeleton";
import { EmptyState } from "@/components/panel/EmptyState";
import { cn } from "@/lib/utils";

/** Gallery.tsx ile birebir aynı doku setı — placeholder tutarlılığı için. */
const TONES: Record<number, string> = {
  0: "radial-gradient(120% 90% at 20% 0%, rgba(201,162,75,0.20), transparent 55%), linear-gradient(155deg,#211a24,#0c0b10)",
  1: "radial-gradient(120% 90% at 80% 10%, rgba(201,162,75,0.14), transparent 55%), linear-gradient(155deg,#1a1922,#0b0a0f)",
  2: "radial-gradient(120% 90% at 30% 100%, rgba(140,106,47,0.22), transparent 55%), linear-gradient(135deg,#241c16,#0e0c0a)",
  3: "radial-gradient(120% 90% at 70% 0%, rgba(201,162,75,0.12), transparent 55%), linear-gradient(160deg,#181a20,#0b0c0e)",
};

const INPUT =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 font-sans text-sm text-ink placeholder:text-muted2 focus:border-brass focus:outline-none";

export default function GalleryPage() {
  const { data, ready, addGalleryItem, removeGalleryItem } = usePanelStore();
  const gallery = data.barber.gallery;

  const [alt, setAlt] = useState("");
  const [src, setSrc] = useState("");
  const [tone, setTone] = useState<0 | 1 | 2 | 3>(0);

  function handleAdd() {
    const altText = alt.trim() || "Galeri görseli";
    const url = src.trim();
    if (url) {
      addGalleryItem({ alt: altText, src: url });
    } else {
      addGalleryItem({ alt: altText, tone });
    }
    setAlt("");
    setSrc("");
    setTone(0);
  }

  return (
    <div>
      <PageHeader
        eyebrow="İçerik"
        title="Galeri"
        subtitle="Dükkanınızdan kareler ekleyin."
      />

      <div className="space-y-6">
        <SectionCard
          title="Yeni Görsel"
          description="Bir fotoğraf bağlantısı yapıştırın ya da hazır bir doku seçin."
        >
          <div className="space-y-4">
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Açıklama (örn. Sıcak havlu ustura tıraşı)"
              className={INPUT}
            />
            <input
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              placeholder="Fotoğraf URL'si (opsiyonel)"
              inputMode="url"
              className={INPUT}
            />

            {!src.trim() && (
              <div>
                <p className="mb-2 font-sans text-xs text-muted2">Doku seç</p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t as 0 | 1 | 2 | 3)}
                      style={{ backgroundImage: TONES[t] }}
                      aria-label={`Doku ${t + 1}`}
                      className={cn(
                        "h-12 w-12 rounded-lg border-2 transition",
                        tone === t
                          ? "border-brass"
                          : "border-line hover:border-brass/40",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hr-brass my-5" />
          <div className="flex justify-end">
            <button onClick={handleAdd} className="btn-brass">
              <Plus className="h-4 w-4" />
              Galeriye Ekle
            </button>
          </div>
        </SectionCard>

        <p className="font-sans text-xs leading-relaxed text-muted2">
          Not: Prototipte görseller URL ya da hazır doku olarak eklenir. Gerçek
          dosya yükleme (Supabase Storage) Faz 2&apos;de gelecek.
        </p>

        {!ready ? (
          <GridSkeleton items={6} />
        ) : gallery.length === 0 ? (
          <EmptyState
            icon={ImagePlus}
            title="Galeri boş"
            description="Yukarıdan ilk görseli ekleyin."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-line"
              >
                {g.src ? (
                  // Keyfi URL'ler için düz <img> (next/image yalnız izinli alanlara açık).
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="h-full w-full object-cover duotone"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ backgroundImage: TONES[g.tone ?? 0] }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="absolute inset-x-0 bottom-0 truncate px-3 py-2 font-sans text-xs text-ink opacity-0 transition group-hover:opacity-100">
                  {g.alt}
                </p>
                <button
                  onClick={() => removeGalleryItem(g.id)}
                  aria-label="Görseli sil"
                  className="absolute right-2 top-2 rounded-lg border border-line bg-bg/80 p-1.5 text-muted opacity-0 backdrop-blur-sm transition hover:border-red-400/40 hover:text-red-300/90 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
