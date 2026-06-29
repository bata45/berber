import type { Barber } from "@/lib/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppFloat({ barber }: { barber: Barber }) {
  const wa = buildWhatsAppUrl(
    barber.whatsapp,
    `Merhaba ${barber.shopName}, randevu almak istiyorum.`,
  );
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp’tan randevu al"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full border border-brass/40 bg-surface/90 p-3.5 shadow-brass backdrop-blur transition hover:gap-2 hover:pr-5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brass/20 [animation-duration:2.5s]" />
      <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm font-semibold text-ink transition-all duration-300 group-hover:max-w-[160px]">
        Randevu al
      </span>
    </a>
  );
}
