import { ornekBerber } from "@/lib/seed/ornek-berber";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { About } from "@/components/site/About";
import { BookingWidget } from "@/components/site/BookingWidget";
import { HoursLocation } from "@/components/site/HoursLocation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export default function Page() {
  const barber = ornekBerber;

  return (
    <>
      <SiteHeader barber={barber} />
      <main>
        <Hero barber={barber} />
        <Services barber={barber} />
        <Gallery barber={barber} />
        <About barber={barber} />
        <BookingWidget barber={barber} />
        <HoursLocation barber={barber} />
      </main>
      <SiteFooter barber={barber} />
      <WhatsAppFloat barber={barber} />
    </>
  );
}
