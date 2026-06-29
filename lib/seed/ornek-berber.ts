import type { Barber } from "@/lib/types";

/**
 * Demo tenant — a specific, believable İstanbul barber.
 * The phone/WhatsApp numbers are fictional (0555 0xx) placeholders for the demo.
 * When onboarding a real shop, every field here is replaced from the panel/DB.
 */
export const ornekBerber: Barber = {
  slug: "usta-selim",
  shopName: "Usta Selim",
  master: "Selim Aydın",
  tagline: "Moda’nın köşesinde, ustura keskinliğinde tıraş.",
  about: [
    "Selim Usta 2006’da Moda Caddesi’nde tek koltukla başladı. Bugün üç koltuklu tıraş evimizde klasik sıcak havlu ustura tıraşından modern saç tasarımına kadar her detayı aynı titizlikle yapıyoruz.",
    "Acelesiz, randevulu çalışırız: sıranı beklemezsin, koltuk senin saatine ayrılır. Kahven hazır, makasımız keskin.",
  ],
  sinceYear: 2006,
  rating: 4.9,
  reviewCount: 327,
  address: "Moda Caddesi No: 42",
  district: "Kadıköy",
  city: "İstanbul",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Moda%20Caddesi%20Kad%C4%B1k%C3%B6y%20%C4%B0stanbul&z=15&output=embed",
  phoneDisplay: "0555 012 34 56",
  whatsapp: "905550123456",
  instagram: "ustaselim.berber",
  bookingMode: "both",
  slotMinutes: 30,
  services: [
    {
      id: "sac",
      name: "Saç Kesimi",
      price: 400,
      durationMin: 30,
      description: "Makas + makine, yıkama dahil.",
      popular: true,
    },
    {
      id: "sakal",
      name: "Sakal Tıraşı (Ustura)",
      price: 250,
      durationMin: 20,
      description: "Şekillendirme ve ustura ile bitiş.",
    },
    {
      id: "sac-sakal",
      name: "Saç + Sakal",
      price: 600,
      durationMin: 45,
      description: "Tam bakım; en çok tercih edilen.",
      popular: true,
    },
    {
      id: "ustura",
      name: "Sıcak Havlu Ustura Tıraşı",
      price: 350,
      durationMin: 30,
      description: "Klasik berber usulü, sıcak havla.",
    },
    {
      id: "cocuk",
      name: "Çocuk Saç Kesimi",
      price: 300,
      durationMin: 25,
      description: "0–10 yaş, sabırla.",
    },
    {
      id: "yikama",
      name: "Saç Yıkama & Fön",
      price: 150,
      durationMin: 15,
    },
    {
      id: "cilt",
      name: "Cilt Bakımı & Maske",
      price: 450,
      durationMin: 30,
      description: "Siyah nokta temizliği, nem maskesi.",
    },
    {
      id: "agda",
      name: "Kaş / Burun / Kulak Ağda",
      price: 150,
      durationMin: 15,
    },
  ],
  hours: [
    { day: "Pazartesi", open: "09:30", close: "20:30" },
    { day: "Salı", open: "09:30", close: "20:30" },
    { day: "Çarşamba", open: "09:30", close: "20:30" },
    { day: "Perşembe", open: "09:30", close: "20:30" },
    { day: "Cuma", open: "09:30", close: "21:00" },
    { day: "Cumartesi", open: "09:00", close: "21:00" },
    { day: "Pazar", open: "", close: "", closed: true },
  ],
  gallery: [
    { id: "g1", alt: "Sıcak havlu ustura tıraşı", tone: 0 },
    { id: "g2", alt: "Modern saç kesimi detayı", tone: 1 },
    { id: "g3", alt: "Dükkân içi, üç koltuklu salon", tone: 2 },
    { id: "g4", alt: "Sakal şekillendirme", tone: 3 },
    { id: "g5", alt: "Berber koltuğu ve aynalar", tone: 1 },
    { id: "g6", alt: "Klasik berber takımları", tone: 2 },
  ],
};
