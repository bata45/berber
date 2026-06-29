"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { usePanelStore, type ProfilePatch } from "@/lib/store/panel-store";
import { PageHeader } from "@/components/panel/PageHeader";
import { SectionCard } from "@/components/panel/SectionCard";
import { Field } from "@/components/panel/Field";
import { FormSkeleton } from "@/components/panel/Skeleton";

interface ProfileForm {
  shopName: string;
  master: string;
  tagline: string;
  about: string;
  address: string;
  district: string;
  city: string;
  phoneDisplay: string;
  whatsapp: string;
  instagram: string;
}

export default function ProfilePage() {
  const { data, ready, updateProfile } = usePanelStore();
  const [form, setForm] = useState<ProfileForm | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const b = data.barber;
    setForm({
      shopName: b.shopName,
      master: b.master,
      tagline: b.tagline,
      about: b.about.join("\n\n"),
      address: b.address,
      district: b.district,
      city: b.city,
      phoneDisplay: b.phoneDisplay,
      whatsapp: b.whatsapp,
      instagram: b.instagram,
    });
    // İlk ready'de seed/localStorage'dan doldur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function set<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
    setSaved(false);
  }

  function handleSave() {
    if (!form) return;
    const patch: ProfilePatch = {
      shopName: form.shopName.trim(),
      master: form.master.trim(),
      tagline: form.tagline.trim(),
      about: form.about
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
      address: form.address.trim(),
      district: form.district.trim(),
      city: form.city.trim(),
      phoneDisplay: form.phoneDisplay.trim(),
      whatsapp: form.whatsapp.replace(/\D/g, ""),
      instagram: form.instagram.replace(/^@+/, "").trim(),
    };
    updateProfile(patch);
    setSaved(true);
  }

  if (!ready || !form) {
    return (
      <div>
        <PageHeader
          eyebrow="İçerik"
          title="Profil"
          subtitle="Dükkan bilgilerinizi düzenleyin."
        />
        <FormSkeleton fields={6} />
      </div>
    );
  }

  const saveBtn = (
    <button onClick={handleSave} className="btn-brass">
      {saved ? (
        <>
          <Check className="h-4 w-4" />
          Kaydedildi
        </>
      ) : (
        "Kaydet"
      )}
    </button>
  );

  return (
    <div>
      <PageHeader
        eyebrow="İçerik"
        title="Profil"
        subtitle="Dükkan bilgilerinizi düzenleyin."
      />

      <div className="space-y-6">
        <SectionCard title="Genel" footer={saveBtn}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Dükkan Adı"
              value={form.shopName}
              onChange={(v) => set("shopName", v)}
            />
            <Field
              label="Usta / Sahip"
              value={form.master}
              onChange={(v) => set("master", v)}
            />
          </div>
          <Field
            className="mt-4"
            label="Slogan"
            value={form.tagline}
            onChange={(v) => set("tagline", v)}
            placeholder="Kısa, çarpıcı bir slogan"
          />
          <Field
            className="mt-4"
            label="Hakkında"
            value={form.about}
            onChange={(v) => set("about", v)}
            multiline
            rows={6}
            hint="Paragrafları boş satırla ayırın."
          />
        </SectionCard>

        <SectionCard title="Konum & İletişim" footer={saveBtn}>
          <Field
            label="Adres"
            value={form.address}
            onChange={(v) => set("address", v)}
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="İlçe"
              value={form.district}
              onChange={(v) => set("district", v)}
            />
            <Field
              label="Şehir"
              value={form.city}
              onChange={(v) => set("city", v)}
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Telefon"
              value={form.phoneDisplay}
              onChange={(v) => set("phoneDisplay", v)}
              type="tel"
              inputMode="tel"
              placeholder="0555 012 34 56"
            />
            <Field
              label="WhatsApp"
              value={form.whatsapp}
              onChange={(v) => set("whatsapp", v.replace(/[^\d]/g, ""))}
              inputMode="tel"
              prefix="+"
              hint="Uluslararası, sadece rakam: 905550123456"
            />
          </div>
          <Field
            className="mt-4"
            label="Instagram"
            value={form.instagram}
            onChange={(v) => set("instagram", v.replace(/^@+/, ""))}
            prefix="@"
            placeholder="kullaniciadi"
          />
        </SectionCard>
      </div>
    </div>
  );
}
