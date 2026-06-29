import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ornekBerber as b } from "@/lib/seed/ornek-berber";

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${b.shopName} — Erkek Kuaförü & Tıraş Evi | ${b.district}, ${b.city}`,
  description: `${b.shopName}, ${b.sinceYear}’dan beri ${b.district}’de. Saç, sakal ve ustura tıraşı için online randevu alın. ${b.address}, ${b.district}.`,
  keywords: [
    "berber", "erkek kuaförü", "tıraş", "sakal tıraşı", "saç kesimi",
    b.district, b.city, b.shopName, "randevu",
  ],
  openGraph: {
    title: `${b.shopName} — ${b.district}, ${b.city}`,
    description: b.tagline,
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
