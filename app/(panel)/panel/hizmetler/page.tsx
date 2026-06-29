"use client";

import { Plus, Trash2, Star } from "lucide-react";
import { usePanelStore } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { EmptyState } from "@/components/panel/EmptyState";
import { FormSkeleton } from "@/components/panel/Skeleton";
import { cn } from "@/lib/utils";

const INPUT =
  "rounded-lg border border-line bg-surface px-3 py-2 font-sans text-sm text-ink placeholder:text-muted2 focus:border-brass focus:outline-none";

export default function ServicesPage() {
  const { data, ready, addService, updateService, removeService } =
    usePanelStore();
  const services = data.barber.services;

  return (
    <div>
      <PageHeader
        eyebrow="İçerik"
        title="Hizmetler"
        subtitle="Fiyat ve süreleri düzenleyin; değişiklikler anında kaydedilir."
        action={
          <button
            onClick={() =>
              addService({ name: "Yeni Hizmet", price: 0, durationMin: 30 })
            }
            className="btn-brass"
          >
            <Plus className="h-4 w-4" />
            Hizmet Ekle
          </button>
        }
      />

      {!ready ? (
        <FormSkeleton fields={5} />
      ) : services.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="Henüz hizmet yok"
          description="Yukarıdaki butonla ilk hizmetinizi ekleyin."
        />
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="card p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <input
                  value={s.name}
                  onChange={(e) => updateService(s.id, { name: e.target.value })}
                  placeholder="Hizmet adı"
                  className={cn(INPUT, "flex-1 font-medium")}
                />
                <button
                  onClick={() => removeService(s.id)}
                  aria-label="Hizmeti sil"
                  className="rounded-lg border border-line p-2 text-muted2 transition hover:border-red-400/40 hover:text-red-300/90"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2">
                  <span className="font-sans text-xs text-muted2">Fiyat</span>
                  <span className="flex items-center rounded-lg border border-line bg-surface focus-within:border-brass">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={s.price}
                      onChange={(e) =>
                        updateService(s.id, {
                          price: Number(e.target.value) || 0,
                        })
                      }
                      className="w-24 bg-transparent px-3 py-2 font-sans text-sm tabular-nums text-ink focus:outline-none"
                    />
                    <span className="pr-3 font-sans text-sm text-muted2">₺</span>
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <span className="font-sans text-xs text-muted2">Süre</span>
                  <span className="flex items-center rounded-lg border border-line bg-surface focus-within:border-brass">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={5}
                      step={5}
                      value={s.durationMin}
                      onChange={(e) =>
                        updateService(s.id, {
                          durationMin: Number(e.target.value) || 0,
                        })
                      }
                      className="w-20 bg-transparent px-3 py-2 font-sans text-sm tabular-nums text-ink focus:outline-none"
                    />
                    <span className="pr-3 font-sans text-sm text-muted2">dk</span>
                  </span>
                </label>

                <button
                  onClick={() => updateService(s.id, { popular: !s.popular })}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs font-medium transition",
                    s.popular
                      ? "border-brass bg-brass/15 text-brass-light"
                      : "border-line text-muted hover:border-brass/40 hover:text-ink",
                  )}
                >
                  <Star className={cn("h-3.5 w-3.5", s.popular && "fill-current")} />
                  Popüler
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
